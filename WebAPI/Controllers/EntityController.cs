using BL.Helpers;
using BL.Services;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntityController<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto> : ControllerBase
    {
        protected readonly IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto> _entity;
        public EntityController(IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto> entity)
        {
            _entity = entity;
        }

        [HttpGet]
        public virtual ActionResult<LazyLoadResult<List<TReadDTO>>> GetList([FromQuery] LazyloadDto lazyload, [FromQuery] TQueryDto queryDto)
        {
            var data = _entity.GetList(lazyload, queryDto);
            var count = _entity.GetCount(queryDto);
            var result = new LazyLoadResult<List<TReadDTO>>(count, data);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public virtual ActionResult<TReadDTO> GetById(TKey id)
        {
            var result = _entity.Get(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public virtual ActionResult<TReadDTO> Insert(TCreateDTO modelDto)
        {
            var model = modelDto.Adapt<TEntity>();
            var result = _entity.Add(model);
            return CreatedAtAction("Insert", result);
        }

        [HttpPut("{id}")]
        public virtual ActionResult<TReadDTO> Update(TKey id, TUpdateDto modelDto)
        {
            var entity = _entity.FindById(id);
            if (entity is null)
            {
                return NotFound();
            }

            var model = modelDto.Adapt<TEntity>();
            var properties = modelDto.GetType().GetProperties();
            foreach (var property in properties)
            {
                var p = entity.GetType().GetProperty(property.Name);
                if (p is not null)
                {
                    p.SetValue(entity, property.GetValue(modelDto));
                }
            }
            var result = _entity.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public virtual ActionResult Delete(TKey id)
        {
            var entity = _entity.FindById(id);
            _entity.Delete(entity);
            return Ok();
        }
    }
}
