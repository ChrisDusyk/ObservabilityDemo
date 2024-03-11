using Azure.Monitor.OpenTelemetry.AspNetCore;
using Microsoft.EntityFrameworkCore;
using ObservabilityDemo.Server.Database;
using ObservabilityDemo.Server.Controllers;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DemoContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// Add OpenTelemetry config
var honeycombConfig = builder.Configuration.GetHoneycombOptions();
builder.Services
	.AddOpenTelemetry()
	.UseAzureMonitor()
	.WithTracing(otelBuilder =>
	{
		otelBuilder
			.AddHoneycomb(honeycombConfig)
			.AddCommonInstrumentations();
	});

builder.Services.AddSingleton(TracerProvider.Default.GetTracer(honeycombConfig.ServiceName));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
};

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapCourseEndpoints();
app.MapStudentEndpoints();

app.Run();