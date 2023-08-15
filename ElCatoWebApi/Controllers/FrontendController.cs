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
    [ResponseCache(Duration = 60 * 60 * 24 * 7)]
    [OutputCache(Duration = 60 * 60 * 24 * 7)]
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
            ViewData["Title"] = "El Cato";

            var jsDi = new DirectoryInfo("wwwroot/react/static/js");
            var jsFiles = jsDi.GetFiles("main.*.js");
            ViewData["JsFileName"] = jsFiles
                .OrderByDescending(f => f.CreationTimeUtc)
                .Select(f => f.Name)
                .FirstOrDefault();

            var cssDi = new DirectoryInfo("wwwroot/react/static/css");
            var cssFiles = cssDi.GetFiles("main.*.css");
            ViewData["CssFileName"] = cssFiles
                .OrderByDescending(f => f.CreationTimeUtc)
                .Select(f => f.Name)
                .FirstOrDefault();

            string? pageTitle;
            path ??= string.Empty;
            path = path.ToLower().Trim();
            if (path.StartsWith("page") && int.TryParse(path.Replace("page/", ""), out var pageId))
            {
                pageTitle = await _db.Pages
                    .Where(p => p.Id == pageId)
                    .Select(p => $"{p.Card.Section.Title} - {p.Card.Title} - {p.Title}")
                    .FirstOrDefaultAsync();
                if (!string.IsNullOrWhiteSpace(pageTitle))
                {
                    ViewData["Title"] = pageTitle;
                }
                else
                {
                    ViewData["Title"] = "El Cato - Not Found";
                }
            }
            else if (path.StartsWith("admin"))
            {
                ViewData["Title"] = "El Cato - Admin";
            }
            else if (path.Contains("tables-generator"))
            {
                ViewData["Title"] = "El Cato - Tables Generator";
            }
            return View();
        }
    }
}
