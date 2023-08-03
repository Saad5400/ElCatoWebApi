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

namespace ElCatoWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CardsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/Cards
        [AllowAnonymous]
        [OutputCache(Duration = 60 * 60 * 24)]
        [HttpGet]
        public async Task<IActionResult> GetCards()
        {
            return Ok(_db.Cards.Select(c => Card.WithSectionSelector(c)).AsParallel());
        }

        [HttpPost("upsert")]
        public async Task<IActionResult> UpsertCard(Card card)
        {
            if (card.Id == 0)
            {
                return await PostCard(card);
            }
            else
            {
                return await PutCard(card.Id, card);
            }
        }

        // GET: api/Cards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCard(int id)
        {
            var card = await _db.Cards.FindAsync(id);

            if (card == null)
            {
                return NotFound();
            }

            return card;
        }

        // PUT: api/Cards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(int id, Card card)
        {
            if (id != card.Id)
            {
                return BadRequest();
            }

            _db.Entry(card).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(card);
        }

        // POST: api/Cards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostCard(Card card)
        {
            _db.Cards.Add(card);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetCard", new { id = card.Id }, card);
        }

        // DELETE: api/Cards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            var card = await _db.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _db.Cards.Remove(card);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool CardExists(int id)
        {
            return (_db.Cards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
