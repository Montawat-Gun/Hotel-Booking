using BL.Helpers;

namespace BL.Services
{
    public interface IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto, TQueryDto>
    {
        public TEntity FindById(TKey id);
        public int GetCount(TQueryDto queryDto);
        public List<TReadDTO> GetList();
        public List<TReadDTO> GetList(LazyloadDto lazyload, TQueryDto queryDto);
        public TReadDTO Get(TKey id);
        public TReadDTO Add(TEntity entity);
        public TReadDTO AddUnsave(TEntity entity);
        public TReadDTO Update(TEntity entity);
        public TReadDTO UpdateUnsave(TEntity entity);
        public void Delete(TEntity entity);
    }
}
