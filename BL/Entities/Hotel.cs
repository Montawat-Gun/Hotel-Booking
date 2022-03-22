using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Entities
{
    public class Hotel : Auditable
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public int ProvinceId { get; set; }

        [Required]
        public int AmphureId { get; set; }

        [Required]
        public int TumbolId { get; set; }

        public List<Booking> Booking { get; set; }
    }
}
