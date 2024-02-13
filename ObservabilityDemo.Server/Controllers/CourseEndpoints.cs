using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ObservabilityDemo.Server.Database;
using ObservabilityDemo.Server.Models;

namespace ObservabilityDemo.Server.Controllers;

public static class CourseEndpoints
{
	public static void MapCourseEndpoints(this IEndpointRouteBuilder routes)
	{
		var group = routes.MapGroup("/api/Course").WithTags(nameof(Course));

		group.MapGet("/", async (DemoContext db) =>
		{
			var courses = await db.Courses.ToListAsync();
			return courses.Select(c => c.ToCourse());
		})
		.WithName("GetAllCourses")
		.WithOpenApi();

		group.MapGet("/{id}", async Task<Results<Ok<Course>, NotFound>> (Guid id, DemoContext db) =>
		{
			return await db.Courses.AsNoTracking()
				.FirstOrDefaultAsync(model => model.CourseId == id)
				is CourseEntity model
					? TypedResults.Ok(model.ToCourse())
					: TypedResults.NotFound();
		})
		.WithName("GetCourseById")
		.WithOpenApi();

		group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (Guid id, Course course, DemoContext db) =>
		{
			var affected = await db.Courses
				.Where(model => model.CourseId == id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(m => m.CourseId, course.Id)
					.SetProperty(m => m.Title, course.Title)
					.SetProperty(m => m.Credits, course.Credits)
					);
			return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
		})
		.WithName("UpdateCourse")
		.WithOpenApi();

		group.MapPost("/", async (Course course, DemoContext db) =>
		{
			var entity = course.ToCourseEntity();
			db.Courses.Add(entity);
			await db.SaveChangesAsync();
			return TypedResults.Created($"/api/Course/{entity.CourseId}", entity.ToCourse());
		})
		.WithName("CreateCourse")
		.WithOpenApi();
	}

	private static Course ToCourse(this CourseEntity courseEntity) =>
		new(courseEntity.CourseId, courseEntity.Title, courseEntity.Credits);

	private static CourseEntity ToCourseEntity(this Course course) =>
		new()
		{
			CourseId = course.Id,
			Title = course.Title,
			Credits = course.Credits
		};
}