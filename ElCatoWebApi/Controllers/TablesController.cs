using ElCatoWebApi.Models.TablesTool;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TablesController : ControllerBase
{
    [EnableRateLimiting("fixed")]
    [ResponseCache(Duration = 60 * 10)]
    [OutputCache(Duration = 60 * 10)]
    [HttpPost]
    public ActionResult<List<Table>> PostTable(List<Course> courses)
    {
        if (courses.Any(c => c.Options.Count == 0 || c.Options.Any(o => o.DayPeriods.Any(string.IsNullOrWhiteSpace))))
        {
            return BadRequest();
        }
        // the object to return
        var tables = new List<Table>();

        // make sure each option has a reference to its course
        foreach (var course in courses)
        {
            foreach (var option in course.Options)
            {
                option.Course = course;
            }
        }
        
        // make the first few tables using the first course
        var firstCourse = courses.First();

        foreach (var option in firstCourse.Options)
        {
            var table = new Table();
            foreach (var optionDayPeriod in option.DayPeriods)
            {
                table.Courses.Add(optionDayPeriod, option.ToMinimal());
            }
            tables.Add(table);
        }

        // make the rest of the tables using the rest of the courses
        // by cloning the tables and adding the new courses
        foreach (var course in courses.Skip(1))
        {
            var clonedTables = new List<Table>();
            // each option is a group for the course
            foreach (var option in course.Options)
            {
                foreach (var t in tables)
                {
                    var clone = t.Clone();
                    var conflict = false;

                    // each dayPeriod is a single hour in a day
                    foreach (var dayPeriod in option.DayPeriods)
                    {
                        if (clone.Courses.ContainsKey(dayPeriod))
                        {
                            conflict = true;
                            break;
                        }
                        clone.Courses.Add(dayPeriod, option.ToMinimal());
                    }

                    // in case there is a conflict, don't add the table
                    if (!conflict)
                    {
                        // calculate days off for the clone
                        var uniqueDays = clone.Courses.Keys
                            .Select(k => k.Substring(0, 2))
                            .Distinct();
                        clone.DaysOff = 5 - uniqueDays.Count();

                        var hoursOff = 0;

                        void calculateHoursOff(IEnumerable<string> days)
                        {
                            if (days.Any())
                            {
                                var periods = days.Select(k => k.Substring(2));
                                var periodsInt = periods.Select(p => int.Parse(p));

                                var first = periodsInt.Min();
                                var last = periodsInt.Max();

                                for (int i = first; i < last; i++)
                                {
                                    if (!periodsInt.Contains(i))
                                    {
                                        hoursOff++;
                                    }
                                }

                            }
                        }

                        for (int i = 1; i <= 5; i++)
                        {
                            calculateHoursOff(clone.Courses.Keys
                                .Where(k => k.StartsWith($"0{i}")));
                        }

                        clone.HoursOff = hoursOff;

                        clonedTables.Add(clone);
                    }
                }
            }
            tables = clonedTables;
        }

        tables = tables.OrderByDescending(t => t.DaysOff)
            .ThenBy(t => t.HoursOff)
            .ToList();

        return Ok(tables);
    }
}
