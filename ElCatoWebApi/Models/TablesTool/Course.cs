using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models.TablesTool;

public enum CourseType
{
    OnSite,
    Online
}

public class Course
{
    [Required]
    public string Name { get; set; }
    public CourseType Type { get; set; } = CourseType.OnSite;
    [Required]
    public List<CourseOption> Options { get; set; } = new();
}

public class MinimalCourse
{
    public MinimalCourse(Course course)
    {
        Name = course.Name;
        Type = course.Type;
    }
    public string Name { get; set; }
    public CourseType Type { get; set; }
}