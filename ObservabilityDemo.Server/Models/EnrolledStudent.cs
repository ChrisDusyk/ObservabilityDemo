namespace ObservabilityDemo.Server.Models
{
	public record EnrolledStudent(int Id, string LastName, string FirstName, DateTime EnrollmentDate, IEnumerable<Enrollment> Enrollments);
}