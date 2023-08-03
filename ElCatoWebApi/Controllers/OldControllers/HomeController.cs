using ElCatoWebApi;
using ElCatoWebApi.Data;
using ElCatoWebApi.Models.OldModels.ViewModels;
using ElCatoWebApi.Models.OldModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace ElCatoWebApi.Controllers.OldControllers
{
    [EnableRateLimiting("fixed")]
    [ResponseCache(Duration = 60 * 60 * 24 * 30)]
    [OutputCache(Duration = 60 * 60 * 24 * 30)]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly OldDbContext _db;
        private readonly ICompositeViewEngine _viewEngine;
        public HomeController(ILogger<HomeController> logger, OldDbContext db, ICompositeViewEngine viewEngine)
        {
            _logger = logger;
            _db = db;
            _viewEngine = viewEngine;
        }
        public IActionResult Index()
        {
            Random random = new Random();

            var alerts = _db.HomeAlerts.ToArray();

            HomeVM vm = new HomeVM
            {
                Cards = _db.Cards
                    .OrderBy(c => c.DisplayOrder)
                    .Include(c => c.Items.OrderBy(i => i.DisplayOrder))
                        .ThenInclude(i => i.Page)
                    .ToList(),
                Alert = alerts[random.Next(alerts.Length)],
            };


            return View(vm);
        }

        [HttpGet("/Programming/{folder}/{name}")]
        public IActionResult Java(string? folder, string? name)
        {
            if (folder == null || name == null)
            {
                return RedirectToAction("Index");
            }

            folder = folder.Replace('_', ' ');
            name = name.Replace('_', ' ');
            Page page = _db.Pages.FirstOrDefault(p => p.Folder == folder && p.Name == name);
            if (page == null)
            {
                return RedirectToAction("Index");
            }

            if (!Program.IsDevelopment)
            {
                page.IncrementViewCount();
            }
            _db.SaveChanges();

            return View(page);
        }

        public IActionResult RenderJavaView()
        {
            var viewData = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary())
            {
                Model = new Page
                {
                    Name = "Lab 1",
                    Folder = "Java1",
                    Content = "Hello World",
                }
            };
            using var sw = new StringWriter();
            var viewResult = _viewEngine.FindView(ControllerContext, "Java", false);
            var viewContext = new ViewContext(ControllerContext, viewResult.View, viewData, TempData, sw, new HtmlHelperOptions());
            viewResult.View.RenderAsync(viewContext).GetAwaiter().GetResult();
            return Content(sw.ToString(), "text/html");
        }

        // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        // public IActionResult Error()
        // {
        //     return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        // }
    }
}