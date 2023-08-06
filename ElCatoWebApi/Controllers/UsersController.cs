using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElCatoWebApi.Data;
using ElCatoWebApi.Models;
using ElCatoWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi.Controllers
{
    [EnableRateLimiting("fixed")]
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtManager _jwtManager;
        private readonly IConfiguration _configuration;

        public UsersController(AppDbContext db, JwtManager jwtManager, IConfiguration configuration)
        {
            _db = db;
            _jwtManager = jwtManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        [ResponseCache(Duration = 60 * 60)]
        [OutputCache(Duration = 60 * 60)]
        public async Task<ActionResult<Token>> Authenticate(User user)
        {
            var token = await _jwtManager.Authenticate(user.Username, user.Password);

            if (token == null)
            {
                return NotFound();
            }

            return Ok(token);
        }

        [HttpPost]
        [Route("admin")]
        public ActionResult<bool> IsAdmin()
        {
            return Ok(true);
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        // POST: api/Users
        [AllowAnonymous]
        [HttpPost("{password}")]
        public async Task<ActionResult<User>> PostUser(string password, [FromBody] User user)
        {
            if (password != _configuration.GetSection("UsersPassword").Get<string>())
            {
                return NotFound();
            }
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return CreatedAtAction("PostUser", new { id = user.Id }, user);
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("update-sitemap")]
        public async Task<IActionResult> UpdateSiteMap()
        {
            var success = await SitemapUpdater.UpdateSiteMap(_db);
            return success ? Ok("Site Map updated successfully") : BadRequest("Site Map could not be updated");
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _db.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _db.Entry(user).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_db.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
