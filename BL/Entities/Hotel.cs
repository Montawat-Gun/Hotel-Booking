using System.ComponentModel.DataAnnotations;

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

        [Required, StringLength(200)]
        public string Address { get; set; }

        public List<Booking> Booking { get; set; }
    }
}
