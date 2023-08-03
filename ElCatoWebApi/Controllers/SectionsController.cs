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
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public SectionsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/Sections
        [AllowAnonymous]
        [HttpGet]
        [EnableRateLimiting("fixed")]
        [ResponseCache(Duration = 60 * 10)]
        [OutputCache(Duration = 60 * 10)]
        public IActionResult GetSections()
        {
            return Ok(_db.Sections.Select(s => Section.WithCardsAndPagesSelector(s)));
        }

        // GET: api/Sections/5
        [HttpGet("{id}")]
        public ActionResult<Section> GetSection(int id)
        {
            var section = _db.Sections.Find(id);

            if (section == null)
            {
                return NotFound();
            }

            return section;
        }

        [HttpPost("upsert")]
        public IActionResult UpsertSection(Section section)
        {
            if (section.Id == 0)
            {
                return PostSection(section);
            }
            else
            {
                return PutSection(section.Id, section);
            }
        }

        // PUT: api/Sections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutSection(int id, Section section)
        {
            if (id != section.Id)
            {
                return BadRequest();
            }

            _db.Entry(section).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(section);
        }

        // POST: api/Sections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostSection(Section section)
        {
            _db.Sections.Add(section);
            _db.SaveChanges();

            return CreatedAtAction("GetSection", new { id = section.Id }, section);
        }

        // DELETE: api/Sections/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSection(int id)
        {
            var section = _db.Sections.Find(id);
            if (section == null)
            {
                return NotFound();
            }

            _db.Sections.Remove(section);
            _db.SaveChanges();

            return NoContent();
        }

        private bool SectionExists(int id)
        {
            return (_db.Sections?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
