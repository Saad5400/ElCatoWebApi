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

namespace ElCatoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtManager _jwtManager;

        public UsersController(AppDbContext db, JwtManager jwtManager)
        {
            _db = db;
            _jwtManager = jwtManager;
        }

        [HttpPost]
        [Route("login")]
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
        [Authorize]
        [Route("admin")]
        public async Task<ActionResult<bool>> IsAdmin()
        {
            var username = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            return Ok(await _db.Users.AnyAsync(u => u.Username == username));
        }

        /*
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _db.Users.ToListAsync();
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
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
        */
    }
}
