using BL.Data;
using BL.Entities;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    internal class EntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto> : IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto>
        where TEntity : class, IAuditable
    {
        protected readonly DbSet<TEntity> _entties;
        protected readonly DataContext _context;

        public EntityService(DataContext context)
        {
            _context = context;
            _entties = context.Set<TEntity>();
        }

        public TEntity FindById(TKey id)
        {
            var result = _entties.Find(id);
            return result;
        }

        public List<TReadDTO> GetList()
        {
            var result = _entties.ToList();
            return result.Adapt<List<TReadDTO>>();
        }

        public TReadDTO Get(TKey id)
        {
            var result = _entties.Find(id);
            return result.Adapt<TReadDTO>();
        }

        public TReadDTO Add(TEntity entity)
        {
            entity.CreateDate = DateTime.UtcNow;
            entity.UpdateDate = DateTime.UtcNow;
            _entties.Add(entity);
            _context.SaveChanges();
            return entity.Adapt<TReadDTO>();
        }

        public TReadDTO Update(TEntity entity)
        {
            entity.UpdateDate = DateTime.UtcNow;
            _entties.Update(entity);
            _context.SaveChanges();
            return entity.Adapt<TReadDTO>();
        }

        public void Delete(TEntity entity)
        {
            _entties.Remove(entity);
            _context.SaveChanges();
        }        
    }
}
