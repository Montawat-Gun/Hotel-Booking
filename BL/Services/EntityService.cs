using BL.Data;
using BL.Entities;
using BL.Helpers;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BL.Services
{
    internal class EntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto> : IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto>, IDisposable
        where TEntity : class, IAuditable
    {
        protected readonly DbSet<TEntity> _entties;
        protected readonly DataContext _context;

        public EntityService(DataContext context)
        {
            _context = context;
            _entties = context.Set<TEntity>();
        }

        public virtual TEntity? FindById(TKey id)
        {
            var result = _entties.Find(id);
            return result;
        }

        public virtual int GetCount()
        {
            var count = _entties.Count();
            return count;
        }

        public virtual List<TReadDTO> GetList()
        {
            var result = _entties.ToList();
            return result.Adapt<List<TReadDTO>>();
        }

        public virtual List<TReadDTO> GetList(LazyloadDto lazyLoad, TQueryDto queryDto)
        {
            var queryManager = new QueryManager<TEntity, TQueryDto>();
            var query = queryManager.GetQuery(_entties, queryDto);
            var result = query.Skip(lazyLoad.First).Take(lazyLoad.Rows).ToList();
            return result.Adapt<List<TReadDTO>>();
        }

        public virtual TReadDTO Get(TKey id)
        {
            var result = _entties.Find(id);
            return result.Adapt<TReadDTO>();
        }

        public virtual TReadDTO Add(TEntity entity)
        {
            entity.CreateDate = DateTime.Now;
            entity.UpdateDate = DateTime.Now;
            _entties.Add(entity);
            _context.SaveChanges();
            return entity.Adapt<TReadDTO>();
        }

        public virtual TReadDTO AddUnsave(TEntity entity)
        {
            entity.CreateDate = DateTime.Now;
            entity.UpdateDate = DateTime.Now;
            _entties.Add(entity);
            return entity.Adapt<TReadDTO>();
        }

        public virtual TReadDTO Update(TEntity entity)
        {
            entity.UpdateDate = DateTime.Now;
            _entties.Update(entity);
            _context.SaveChanges();
            return entity.Adapt<TReadDTO>();
        }

        public virtual TReadDTO UpdateUnsave(TEntity entity)
        {
            entity.UpdateDate = DateTime.Now;
            _entties.Update(entity);
            return entity.Adapt<TReadDTO>();
        }

        public virtual void Delete(TEntity entity)
        {
            _entties.Remove(entity);
            _context.SaveChanges();
        }

        public virtual void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
