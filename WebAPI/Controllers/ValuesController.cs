using BL.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetStatuses")]
        public ActionResult GetStatuses()
        {
            var result = _context.STATUS.ToList();
            return Ok(result);
        }
    }
}
