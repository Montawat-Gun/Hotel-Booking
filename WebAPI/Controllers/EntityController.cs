using BL.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntityController<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto> : ControllerBase
    {
        private readonly IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto> _entity;
        public EntityController(IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto> entity)
        {
            _entity = entity;
        }

        [HttpGet]
        public virtual ActionResult<List<TReadDTO>> GetList()
        {
            return _entity.GetList();
        }

        [HttpGet("{id}")]
        public ActionResult<TReadDTO> GetList(TKey id)
        {
            var result = _entity.Get(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<TReadDTO> Insert(TCreateDTO modelDto)
        {
            var model = modelDto.Adapt<TEntity>();
            var result = _entity.Add(model);
            return CreatedAtAction("Insert", result);
        }

        [HttpPut("{id}")]
        public ActionResult<TReadDTO> Update(TKey id, TUpdateDto modelDto)
        {
            var entity = _entity.FindById(id);
            if (entity is null)
            {
                return NotFound();
            }

            var model = modelDto.Adapt<TEntity>();
            var properties = model.GetType().GetProperties();
            foreach (var property in properties)
            {
                var p = entity.GetType().GetProperty(property.Name);
                if (p is not null)
                {
                    p.SetValue(entity, property.GetValue(model));
                }
            }
            var result = _entity.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(TKey id)
        {
            var entity = _entity.FindById(id);
            _entity.Delete(entity);
            return Ok();
        }
    }
}
