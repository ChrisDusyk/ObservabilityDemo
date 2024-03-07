using Npgsql;
using Azure.Monitor.OpenTelemetry.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using ObservabilityDemo.Server.Database;
using Microsoft.EntityFrameworkCore.Design;
using ObservabilityDemo.Server.Controllers;
using OpenTelemetry.Trace;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DemoContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// Add OpenTelemetry config
builder.Services.ConfigureOpenTelemetryTracerProvider((sp, builder) => builder.AddSource("O11yDemo"));
builder.Services.AddOpenTelemetry().UseAzureMonitor();

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