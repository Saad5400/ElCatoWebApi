using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models.TablesTool;

public enum CourseOptionStatus
{
    Open,
    Closed,
    Booked
}

public class CourseOption
{
    [Required]
    public int Group { get; set; }

    public CourseOptionStatus Status { get; set; } = CourseOptionStatus.Open;

    public string? Teacher { get; set; }
    [Required]
    public List<string> DayPeriods { get; set; } = new();

    // Relationships
    public virtual Course? Course { get; set; } = null!;

    public MinimalCourseOption ToMinimal()
    {
        return new MinimalCourseOption(this);
    }
}

public class MinimalCourseOption
{
    public MinimalCourseOption(CourseOption option)
    {
        Group = option.Group;
        Status = option.Status;
        Teacher = option.Teacher;
        Course = new MinimalCourse(option.Course!);
    }
    public int Group { get; set; }
    public CourseOptionStatus Status { get; set; }
    public string? Teacher { get; set; }
    public MinimalCourse? Course { get; set; }
}