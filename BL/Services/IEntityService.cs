using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public interface IEntityService<TKey, TEntity, TReadDTO, TCreateDTO, TUpdateDto>
    {
        public TEntity FindById(TKey id);
        public List<TReadDTO> GetList();
        public TReadDTO Get(TKey id);
        public TReadDTO Add(TEntity entity);
        public TReadDTO Update(TEntity entity);
        public void Delete(TEntity entity);
    }
}
