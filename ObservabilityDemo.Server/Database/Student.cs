using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ObservabilityDemo.Server.Database
{
	[Table("student")]
	public class Student
	{
		[Column("id")]
		[Key]
		public int Id { get; set; }

		[Column("last_name")]
		public string LastName { get; set; }

		[Column("first_name")]
		public string FirstName { get; set; }

		[Column("enrollment_date")]
		public DateTime? EnrollmentDate { get; set; }

		public ICollection<EnrollmentEntity> Enrollments { get; set; }
	}
}