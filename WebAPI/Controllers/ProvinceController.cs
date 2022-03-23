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
            var result = _province.GetProviceById(provinceId);
            return Ok(result);
        }

        [HttpGet("GetAmphures/{provinceId}")]
        public ActionResult<List<Amphure>> GetAmphures(int provinceId)
        {
            var result = _province.GetAmphuresByProvinceId(provinceId);
            return Ok(result);
        }

        [HttpGet("GetAmphureById/{amphureId}")]
        public ActionResult<Amphure> GetAmphureById(int amphureId)
        {
            var result = _province.GetAmphureById(amphureId);
            return Ok(result);
        }

        [HttpGet("GetTumbols/{amphureId}")]
        public ActionResult<List<Tumbol>> GetTumbols(int amphureId)
        {
            var result = _province.GetTumbolsByAmphureId(amphureId);
            return Ok(result);
        }

        [HttpGet("GetTumbolById/{tumbolId}")]
        public ActionResult<Tumbol> GetTumbolById(int tumbolId)
        {
            var result = _province.GetTumbolById(tumbolId);
            return Ok(result);
        }
    }
}
