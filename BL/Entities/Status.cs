using System.ComponentModel.DataAnnotations;

namespace BL.Entities
{
    public class Status
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public List<Booking> Booking { get; set; }
    }
}
