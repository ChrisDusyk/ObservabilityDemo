using Microsoft.EntityFrameworkCore;

namespace ObservabilityDemo.Server.Database
{
	public class DemoContext : DbContext
	{
		public DemoContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<TestTable> TestTables { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<TestTable>().ToTable("test_table");
		}
	}
}