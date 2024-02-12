using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ObservabilityDemo.Server.Database;
using ObservabilityDemo.Server.Models;

namespace ObservabilityDemo.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestController : ControllerBase
	{
		private readonly DemoContext _demoContext;

		public TestController(DemoContext demoContext)
		{
			_demoContext = demoContext;
		}

		[HttpGet]
		[Produces("application/json", Type = typeof(Models.TestTable[]))]
		public async Task<IEnumerable<Models.TestTable>> GetTestTables()
		{
			var tests = await _demoContext.TestTables.ToListAsync();
			return tests.Select(MapToOutputModel);
		}

		private Models.TestTable MapToOutputModel(Database.TestTable testTable) =>
			new(testTable.Id, testTable.Title, testTable.CreatedDate);
	}
}