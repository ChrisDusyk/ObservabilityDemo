using Microsoft.EntityFrameworkCore;

namespace ObservabilityDemo.Server.Database
{
	public class DemoContext(DbContextOptions options) : DbContext(options)
	{
		public DbSet<Student> Students { get; set; }
		public DbSet<EnrollmentEntity> Enrollments { get; set; }
		public DbSet<CourseEntity> Courses { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<CourseEntity>().ToTable("course");
			modelBuilder.Entity<EnrollmentEntity>().ToTable("enrollment");
			modelBuilder.Entity<Student>().ToTable("student");
		}
	}
}