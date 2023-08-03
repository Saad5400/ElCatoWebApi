using ElCatoWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging.Core;
using System.Net;
using ElCatoWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi.Controllers
{
    [EnableRateLimiting("fixed")]
    [ResponseCache(Duration = 60 * 60)]
    [OutputCache(Duration = 60 * 60 * 24)]
    [Route("/")]
    public class FrontendController : Controller
    {
        private readonly ILogger<FrontendController> _logger;
        private readonly AppDbContext _db;
        public FrontendController(ILogger<FrontendController> logger, AppDbContext db)
        {
            _logger = logger;
            _db = db;
        }


        [HttpGet("/{**path}")]
        public async Task<IActionResult> Index(string? path)
        {
            string? pageTitle = null;
            path ??= string.Empty;
            path = path.ToLower().Trim();
            if (path.StartsWith("page") && int.TryParse(path.Replace("page/", ""), out var pageId))
            {
                pageTitle = await _db.Pages
                    .Where(p => p.Id == pageId)
                    .Select(p => $"{p.Card.Section.Title} - {p.Card.Title} - {p.Title}")
                    .FirstOrDefaultAsync();
            }
            ViewData["Title"] = string.IsNullOrWhiteSpace(pageTitle) ? "El Cato" : pageTitle;
            return View();
        }
    }
}
