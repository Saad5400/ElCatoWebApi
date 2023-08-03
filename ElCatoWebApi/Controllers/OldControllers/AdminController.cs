using ElCatoWebApi.Data;
using ElCatoWebApi.Models.OldModels;
using ElCatoWebApi.Models.OldModels.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace ElCatoWebApi.Controllers.OldControllers
{
    [EnableRateLimiting("fixed")]
    public class AdminController : Controller
    {
        public static readonly string PASSWORD = "MyVeryStrongAndUnPredictablePasswordForTheAdminController";
        private readonly OldDbContext _db;
        public AdminController(OldDbContext db)
        {
            _db = db;
        }
        public bool IsAuthrized(string? password)
        {
            if (password == null)
            {
                return false;
            }
            if (password == PASSWORD)
            {
                return true;
            }
            return false;   
        }
        [HttpGet("[controller]/[action]/{password}")]
        public IActionResult Index(string? password)
        {
            if (!IsAuthrized(password))
            {
                return NotFound();
            }
            var vm = new AdminIndexVM
            {
                Pages = _db.Pages.ToList(),
                Cards = _db.Cards.OrderBy(comparer => comparer.DisplayOrder).ToList(),
                CardList = _db.CardListItems.OrderBy(cl => cl.DisplayOrder).Include(cl => cl.Page).ToList(),
                HomeAlerts = _db.HomeAlerts.ToList()
            };
            return View(vm);
        }
        #region Remove

        // RemoveHomeAlert
        [HttpPost]
        public IActionResult RemoveHomeAlert(int id)
        {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            var alert = _db.HomeAlerts.Find(id);
            if (alert == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            _db.HomeAlerts.Remove(alert);
            _db.SaveChanges();
            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }

        [HttpPost]
        public IActionResult RemovePage(int id) {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            var page = _db.Pages.Find(id);

            if (page == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }

            foreach (var item in _db.CardListItems.Where(x => x.PageId == page.Id))
            {
                _db.CardListItems.Remove(item);
            }

            _db.Pages.Remove(page);
            _db.SaveChanges();

            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }
        [HttpPost]
        public IActionResult RemoveCard(int id) {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }

            var card = _db.Cards.Find(id);

            if (card == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }

            foreach (var item in _db.CardListItems.Where(x => x.CardId == card.Id))
            {
                _db.CardListItems.Remove(item);
            }

            _db.Cards.Remove(card);
            _db.SaveChanges();

            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }

        [HttpPost]
        public IActionResult RemoveCardItem(int id) {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }

            var item = _db.CardListItems.Find(id);

            if (item == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }

            _db.CardListItems.Remove(item);
            _db.SaveChanges();

            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }
        #endregion Remove

        #region Add

        // AddHomeAlert
        public IActionResult AddHomeAlert()
        {
            var alert = new HomeAlert();
            return View(alert);
        }

        [HttpPost]
        public IActionResult AddHomeAlert(HomeAlert alert)
        {
            if (!ModelState.IsValid)
            {
                return View(alert);
            }
            _db.HomeAlerts.Add(alert);
            _db.SaveChanges();
            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }
        public IActionResult AddPage() {
            var page = new Page();
            return View(page);
        }
        [HttpPost]
        public IActionResult AddPage(Page page) {
            if (ModelState.IsValid)
            {
                _db.Pages.Add(page);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return RedirectToAction(nameof(Index), new {password = PASSWORD});
        }

        public IActionResult AddCard() {
            var card = new Card();
            return View(card);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddCard(Card card) {
            if (ModelState.IsValid)
            {
                _db.Cards.Add(card);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(card);
        }

        public IActionResult AddCardItem() {
            var item = new CardListItem();

            ViewBag.Cards = _db.Cards.OrderBy(c => c.DisplayOrder).ToList();
            ViewBag.Pages = _db.Pages.ToList();

            return View(item);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddCardItem(CardListItem item) {
            if (ModelState.IsValid)
            {
                _db.CardListItems.Add(item);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(item);
        }


        #endregion Add

        #region Edit

        // EditHomeAlert
        public IActionResult EditHomeAlert(int id)
        {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            var alert = _db.HomeAlerts.Find(id);
            if (alert == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(alert);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditHomeAlert(HomeAlert alert)
        {
            if (!ModelState.IsValid)
            {
                return View(alert);
            }
            _db.HomeAlerts.Update(alert);
            _db.SaveChanges();
            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }
        // Edit Page
        public IActionResult EditPage(int id)
        {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            var page = _db.Pages.Find(id);
            if (page == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(page);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditPage(Page page)
        {
            if (ModelState.IsValid)
            {
                _db.Pages.Update(page);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(page);
        }

        // Edit Card
        public IActionResult EditCard(int id)
        {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            var card = _db.Cards.Find(id);
            if (card == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(card);
        }
        // edit card post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditCard(Card card)
        {
            if (ModelState.IsValid)
            {
                _db.Cards.Update(card);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            return View(card);
        }
        // edit card item
        public IActionResult EditCardItem(int id)
        {
            if (id <= 0)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }
            var item = _db.CardListItems.Find(id);
            if (item == null)
            {
                return RedirectToAction(nameof(Index), new { password = PASSWORD });
            }

            ViewBag.Cards = _db.Cards.OrderBy(c => c.DisplayOrder).ToList();
            ViewBag.Pages = _db.Pages.ToList();

            return View(item);
        }
        // edit card item post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditCardItem(CardListItem item)
        {
            if (!ModelState.IsValid)
            {
                return View(item);
            }
            _db.CardListItems.Update(item);
            _db.SaveChanges();
            return RedirectToAction(nameof(Index), new { password = PASSWORD });
        }

        #endregion
    
    }
}
