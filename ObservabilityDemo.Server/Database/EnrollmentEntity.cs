using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ObservabilityDemo.Server.Database
{
	[Table("enrollment")]
	public class EnrollmentEntity
	{
		[Column("id")]
		[Key]
		public int EnrollmentId { get; set; }

		[Column("course_id")]
		public Guid CourseId { get; set; }

		[Column("student_id")]
		public int StudentId { get; set; }

		[Column("grade")]
		public int? Grade { get; set; }

		public CourseEntity Course { get; set; }
		public Student Student { get; set; }
	}
}