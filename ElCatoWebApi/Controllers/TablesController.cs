using ElCatoWebApi.Models.TablesTool;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TablesController : ControllerBase
{
    // [EnableRateLimiting("fixed")]
    // [ResponseCache(Duration = 60 * 10)]
    // [OutputCache(Duration = 60 * 10)]
    [HttpPost]
    public ActionResult<List<Table>> PostTable(List<Course> courses)
    {
        var tables = new List<Table>();

        // Populate Course in each CourseOption
        foreach (var course in courses)
        {
            foreach (var option in course.Options)
            {
                option.Course = course;
            }
        }

        /*
         * Notes:
         * 1. The user will provide all available courses and their options
         * 2. Each option will contain one or more DayPeriods
         * 3. DayPeriods look like this: "0101" (Sunday, 1st period) or "0502" (Thursday, 2nd period)
         * 4. Each table must contain exactly one option from each course
         *
         * Algorithm:
         * 1. Select a course
         * 2. For each option in the course, create a table
         * 3. Add that option to the table
         * 4. For each course after the first
         * 5. For each option after the first in the course
         * 6. Clone the existing tables
         * 7. For each option
         * 8. Add the option to each table
         * 9. If there is any conflict while adding, remove the table
         */

        // 1. Select a course
        var firstCourse = courses.First();

        // 2. For each option in the course, create a table
        foreach (var option in firstCourse.Options)
        {
            var table = new Table();
            foreach (var optionDayPeriod in option.DayPeriods)
            {
                // 3. Add that option to the table
                table.Courses.Add(optionDayPeriod, option.ToMinimal());
            }
            tables.Add(table);
        }

        // 4. For each course after the first
        foreach (var course in courses.Skip(1))
        {
            var clonedTables = new List<Table>();
            foreach (var option in course.Options)
            {
                foreach (var t in tables)
                {
                    var clone = t.Clone();
                    var conflict = false;
                    foreach (var dayPeriod in option.DayPeriods)
                    {
                        if (clone.Courses.ContainsKey(dayPeriod))
                        {
                            conflict = true;
                            break;
                        }
                        clone.Courses.Add(dayPeriod, option.ToMinimal());
                    }

                    if (!conflict)
                    {
                        clonedTables.Add(clone);
                    }
                }
            }
            tables = clonedTables;
        }

        return Ok(tables);
    }
}
