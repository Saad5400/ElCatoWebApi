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

        [HttpGet]
        [Route("update-sitemap")]
        public async Task<IActionResult> UpdateSiteMap()
        {
            var baseContent =
            @"<?xml version=""1.0"" encoding=""UTF-8""?>
<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
    <url>
        <loc>https://elcato.azurewebsites.net</loc>
    </url>
    <url>
        <loc>https://elcato.azurewebsites.net/admin</loc>
    </url>
    <url>
        <loc>https://elcato.azurewebsites.net/admin/pages</loc>
    </url>
";

            var pagesIds = _db.Pages.Select(p => p.Id);

            foreach (var pageId in pagesIds)
            {
                baseContent += $@"  <url>
        <loc>https://elcato.azurewebsites.net/page/{pageId}</loc>
    </url>
";
            }
            baseContent += "</urlset>";

            var path = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), @"wwwroot\sitemap.xml");
            var bytes = System.Text.Encoding.UTF8.GetBytes(baseContent);
            await System.IO.File.WriteAllBytesAsync(path, bytes);

            return Ok("Site Map updated successfully");
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
