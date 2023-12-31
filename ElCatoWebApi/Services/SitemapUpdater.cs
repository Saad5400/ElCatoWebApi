﻿using ElCatoWebApi.Data;

namespace ElCatoWebApi.Services
{
    public class SitemapUpdater
    {
        public static async Task<bool> UpdateSiteMap(AppDbContext db)
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

            var textBaseContent = string.Empty;

            var pagesIds = db.Pages.Select(p => p.Id);

            foreach (var pageId in pagesIds)
            {
                baseContent += $@"  <url>
        <loc>https://elcato.azurewebsites.net/page/{pageId}</loc>
    </url>
";

                textBaseContent += $"https://elcato.azurewebsites.net/page/{pageId}\n";
            }
            baseContent += "</urlset>";

            var path = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), @"wwwroot\sitemap.xml");
            var bytes = System.Text.Encoding.UTF8.GetBytes(baseContent);
            await System.IO.File.WriteAllBytesAsync(path, bytes);

            var textPath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), @"wwwroot\sitemap.txt");
            var textBytes = System.Text.Encoding.UTF8.GetBytes(textBaseContent);
            await System.IO.File.WriteAllBytesAsync(textPath, textBytes);

            return true;
        }
    }
}
