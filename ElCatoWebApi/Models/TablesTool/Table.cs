using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models.TablesTool;

public class Table
{
    public Dictionary<string, MinimalCourseOption> Courses { get; set; } = new();
    public int DaysOff { get; set; } = 0;
    public int HoursOff { get; set; } = 0;

    public Table Clone()
    {
        var clone = new Table();
        foreach (var course in Courses)
        {
            clone.Courses.Add(course.Key, course.Value);
        }
        return clone;
    }
}
