using BL.Data;
using BL.Entities;
using BL.Helpers;
using BL.Helpers.Attributes;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BL.Services
{
    internal class EntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto> : IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto>, IDisposable
        where TKey : IEquatable<TKey>
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

        public virtual int GetCount(TQueryDto queryDto)
        {
            var queryManager = new QueryManager<TEntity, TQueryDto>();
            var query = queryManager.GetQuery(_entties, queryDto);
            var count = query.Count();
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
            query = queryManager.GetOrder(query, lazyLoad);
            var result = query.Skip((int)lazyLoad.First!).Take((int)lazyLoad.Rows!)
                .ProjectToType<TReadDTO>().ToList();
            return result;
        }

        public virtual TReadDTO Get(TKey id)
        {
            var fieldInfo = typeof(TEntity).GetProperties().Where(x => x.GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.KeyAttribute), false) is not null).FirstOrDefault();
            TReadDTO result;
            if(fieldInfo is null)
            {
                result = _entties.Find().Adapt<TReadDTO>();
                return result;
            }
            result = _entties.ProjectToType<TReadDTO>().FirstOrDefault(fieldInfo.Name + "==" + id.ToString());
            return result;
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
