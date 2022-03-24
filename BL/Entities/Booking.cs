using BL.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BL.Entities
{
    public class Booking : Auditable
    {
        public long PrimaryKey { get => Id; }

        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime CheckIn { get; set; }

        [Required]
        public DateTime CheckOut { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }

        public Hotel Hotel { get; set; }

        [Required]
        [ForeignKey("Status")]
        public int StatusId { get; set; }

        public Status Status { get; set; }
    }
}
