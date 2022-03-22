using BL.Entities;
using BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly ProvinceService _province;
        public ProvinceController(ProvinceService province)
        {
            _province = province;
        }

        [HttpGet("GetProvinces")]
        public ActionResult<List<Province>> GetProvinces()
        {
            var result = _province.GetProvices();
            return Ok(result);
        }

        [HttpGet("GetProvinceById/{provinceId}")]
        public ActionResult<Province> GetProvinceById(int provinceId)
        {
            var result = _province.GetProvices().FirstOrDefault(x => x.Id == provinceId);
            return Ok(result);
        }

        [HttpGet("GetAmphures/{provinceId}")]
        public ActionResult<List<Amphure>> GetAmphures(int provinceId)
        {
            var result = _province.GetAmphure().Where(x => x.ProvinceId == provinceId);
            return Ok(result);
        }

        [HttpGet("GetAmphureById/{amphureId}")]
        public ActionResult<Amphure> GetAmphureById(int amphureId)
        {
            var result = _province.GetAmphure().FirstOrDefault(x => x.Id == amphureId);
            return Ok(result);
        }

        [HttpGet("GetTumbols/{amphureId}")]
        public ActionResult<List<Tumbol>> GetTumbols(int amphureId)
        {
            var result = _province.GetTumbol().Where(x => x.AmphureId == amphureId);
            return Ok(result);
        }

        [HttpGet("GetTumbolById/{tumbol}")]
        public ActionResult<Amphure> GetTumbolById(int tumbol)
        {
            var result = _province.GetTumbol().FirstOrDefault(x => x.Id == tumbol);
            return Ok(result);
        }
    }
}
