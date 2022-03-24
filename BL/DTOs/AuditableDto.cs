using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTOs
{
    public class AuditableDto
    {
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string CreateDateDesc
        {
            get => CreateDate.ToString("dd/MMMM/yyyy");
        }
        public string UpdateDateDesc
        {
            get => UpdateDate.ToString("dd/MMMM/yyyy");
        }
    }
}
