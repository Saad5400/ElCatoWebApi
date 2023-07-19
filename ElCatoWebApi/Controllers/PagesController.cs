using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElCatoWebApi.Data;
using ElCatoWebApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace ElCatoWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PagesController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/Pages
        [AllowAnonymous]
        [ResponseCache(Duration = 60)]
        [HttpGet]
        public async Task<IActionResult> GetPages()
        {
            return Ok(_db.Pages.Select(p => Page.WithSectionAndCardSelector(p)).AsParallel());
        }

        // GET: api/Pages/5
        [AllowAnonymous]
        [ResponseCache(Duration = 60)]
        [HttpGet("{id}")]
        public async Task<ActionResult<Page>> GetPage(int id)
        {
            var page = await _db.Pages.FindAsync(id);

            if (page == null)
            {
                return NotFound();
            }

            return page;
        }

        // PUT: api/Pages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPage(int id, Page page)
        {
            if (id != page.Id)
            {
                return BadRequest();
            }

            _db.Entry(page).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageExists(id))
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

        // POST: api/Pages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Page>> PostPage(Page page)
        {
            if (_db.Pages == null)
            {
                return Problem("Entity set 'AppDbContext.Pages'  is null.");
            }
            _db.Pages.Add(page);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetPage", new { id = page.Id }, page);
        }

        // DELETE: api/Pages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePage(int id)
        {
            if (_db.Pages == null)
            {
                return NotFound();
            }
            var page = await _db.Pages.FindAsync(id);
            if (page == null)
            {
                return NotFound();
            }

            _db.Pages.Remove(page);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool PageExists(int id)
        {
            return (_db.Pages?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
