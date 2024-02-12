using System.ComponentModel.DataAnnotations.Schema;

namespace ObservabilityDemo.Server.Database
{
	[Table("test_table")]
	public class TestTable
	{
		[Column("id")]
		public int Id { get; set; }

		[Column("title")]
		public string Title { get; set; } = "";

		[Column("created_date")]
		public DateTime CreatedDate { get; set; }
	}
}