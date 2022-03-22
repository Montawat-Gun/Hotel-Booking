using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Entities
{
    public interface IAuditable
    {
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
