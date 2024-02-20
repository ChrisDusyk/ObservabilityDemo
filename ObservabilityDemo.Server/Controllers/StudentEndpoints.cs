using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ObservabilityDemo.Server.Database;
using ObservabilityDemo.Server.Models;
using System.Drawing.Text;

namespace ObservabilityDemo.Server.Controllers
{
	public static class StudentEndpoints
	{
		public static void MapStudentEndpoints(this IEndpointRouteBuilder routes)
		{
			var group = routes.MapGroup("/api/Students").WithTags(nameof(EnrolledStudent));

			group.MapGet("/", async (DemoContext db) =>
			{
				var students = await db.Students.ToListAsync();
				return students.Select(s => s.ToEnrolledStudent());
			})
			.WithName("GetAllStudents")
			.WithOpenApi();

			group.MapGet("/{id}", async Task<Results<Ok<EnrolledStudent>, NotFound>> (int id, DemoContext db) =>
			{
				return await db.Students.AsNoTracking()
					.Include(s => s.Enrollments)
					.ThenInclude(s => s.Course)
					.FirstOrDefaultAsync(model => model.Id == id)
					is Student model
						? TypedResults.Ok(model.ToEnrolledStudent())
						: TypedResults.NotFound();
			})
			.WithName("GetStudentById")
			.WithOpenApi();

			group.MapPost("/", async (NewStudent student, DemoContext db) =>
			{
				var entity = student.ToStudentEntity();
				db.Students.Add(entity);
				await db.SaveChangesAsync();
				return TypedResults.Created($"/api/Student/{entity.Id}", entity.ToEnrolledStudent());
			})
			.WithName("CreateStudent")
			.WithOpenApi();

			group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, EnrolledStudent student, DemoContext db) =>
			{
				var affected = await db.Students
					.Where(model => model.Id == id)
					.ExecuteUpdateAsync(setters => setters
						.SetProperty(m => m.EnrollmentDate, student.EnrollmentDate)
						.SetProperty(m => m.LastName, student.LastName)
						.SetProperty(m => m.FirstName, student.FirstName)
					);
				return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
			})
			.WithName("UpdateStudent")
			.WithOpenApi();

			group.MapPost("/{studentId}/enroll/{courseId}", async (int studentId, Guid courseId, DemoContext db) =>
			{
				var enrollment = new EnrollmentEntity()
				{
					CourseId = courseId,
					StudentId = studentId
				};
				db.Enrollments.Add(enrollment);
				await db.SaveChangesAsync();
				return TypedResults.Ok(enrollment);
			})
			.WithName("EnrollStudent")
			.WithOpenApi();
		}

		private static EnrolledStudent ToEnrolledStudent(this Student student) =>
			new(
				student.Id,
				student.LastName,
				student.FirstName,
				student.EnrollmentDate ?? DateTime.Now,
				student.Enrollments == null ? Enumerable.Empty<Enrollment>() : student.Enrollments.Select(e => e.ToEnrollmentModel()));

		private static Student ToStudentEntity(this NewStudent newStudent) =>
			new()
			{
				FirstName = newStudent.FirstName,
				LastName = newStudent.LastName,
				EnrollmentDate = newStudent.EnrollmentDate
			};

		private static Enrollment ToEnrollmentModel(this EnrollmentEntity enrollment) =>
			new(enrollment.EnrollmentId, enrollment.Grade, enrollment.Course.ToCourse());

		private static Course ToCourse(this CourseEntity courseEntity) =>
			new(courseEntity.CourseId, courseEntity.Title, courseEntity.Credits);
	}
}