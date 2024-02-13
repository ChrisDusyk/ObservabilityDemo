namespace ObservabilityDemo.Server.Models
{
	public record Enrollment(int Id, Guid CourseId, int StudentId, int? Grade);
}