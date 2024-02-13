using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ObservabilityDemo.Server.Database
{
	[Table("course")]
	public class CourseEntity
	{
		[Column("id")]
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		[Key]
		public Guid CourseId { get; set; }

		[Column("title")]
		public string Title { get; set; } = "Missing title";

		[Column("credits")]
		public int Credits { get; set; }

		public ICollection<EnrollmentEntity> Enrollments { get; set; }
	}
}