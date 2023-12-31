﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElCatoWebApi.Data;
using ElCatoWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ElCatoWebApi.Services;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi.Controllers;

[EnableRateLimiting("fixed")]
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

    private async Task<bool> IsAdmin()
    {
        return User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value is not null;
    }

    private async Task<string?> GetIpAddress()
    {
        return HttpContext?.Connection?.RemoteIpAddress?.GetHashString();
    }

    private async Task<string?> GetFingerPrint(string? current)
    {
        return current;
    }

    // GET: api/Pages
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetPages(string? fingerPrint)
    {
        if (!await IsAdmin() && string.IsNullOrWhiteSpace(fingerPrint))
        {
            return Unauthorized();
        }
        else if (!await IsAdmin())
        {
            var ipAddress = await GetIpAddress();
            fingerPrint = await GetFingerPrint(fingerPrint);
            return Ok(_db.Pages.Where(p => p.FingerPrint == fingerPrint || p.IpAddress == ipAddress)
                .Select(p => Page.WithCardSelector(p))
                .AsParallel());
        }

        return Ok(_db.Pages.Select(p => Page.WithCardSelector(p)));
    }

    // GET: api/Pages/5
    [AllowAnonymous]
    [ResponseCache(Duration = 60 * 10)]
    [HttpGet("{id}")]
    public async Task<ActionResult<Page>> GetPage(int id)
    {
        var page = await _db.Pages.FindAsync(id);

        if (page == null)
        {
            return NotFound();
        }

        page.ViewCount += 1;
        await _db.SaveChangesAsync();

        return page;
    }

    [AllowAnonymous]
    [HttpPost("upsert")]
    public async Task<IActionResult> UpsertPage(Page page)
    {
        if (page.Id == 0)
        {
            return await PostPage(page);
        }
        else
        {
            return await PutPage(page.Id, page);
        }
    }

    // PUT: api/Pages/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPage(int id, Page requestPage)
    {
        requestPage.Card = null;

        if (id != requestPage.Id)
        {
            return BadRequest();
        }

        var storedPage = await _db.Pages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

        if (storedPage == null)
        {
            return NotFound();
        }

        if (!await IsAdmin() && requestPage.IpAddress != await GetIpAddress() && requestPage.FingerPrint != storedPage.FingerPrint)
        {
            return Unauthorized();
        }
        else if (!await IsAdmin())
        {
            requestPage.Accepted = false;
        }

        _db.Entry(requestPage).State = EntityState.Modified;

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

        return Ok(requestPage);
    }

    // POST: api/Pages
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> PostPage(Page page)
    {
        page.Card = null;

        if (!await IsAdmin())
        {
            page.Accepted = false;
            page.IpAddress = await GetIpAddress();
            page.FingerPrint = await GetFingerPrint(page.FingerPrint);

            if (string.IsNullOrWhiteSpace(page.FingerPrint) ||
                string.IsNullOrWhiteSpace(page.IpAddress))
            {
                return BadRequest("Missing IP address or FingerPrint");
            }

            if (await _db.Pages.CountAsync(p => (p.FingerPrint == page.FingerPrint || p.IpAddress == page.IpAddress) &&
                                     p.CreatedAt > DateTime.UtcNow.AddHours(-1) && p.Accepted != true) >= 3)
            {
                return StatusCode(429, $"Too many pages, try again after an hour or contact the admin");
            }
        }

        _db.Pages.Add(page);
        await _db.SaveChangesAsync();

        return CreatedAtAction("GetPage", new { id = page.Id }, page);
    }

    // DELETE: api/Pages/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePage(int id)
    {
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
