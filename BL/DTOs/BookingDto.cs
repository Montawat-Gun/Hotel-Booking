using BL.Helpers.Attributes;

namespace BL.DTOs
{
    public class ReadBookingDto : AuditableDto
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public decimal Price { get; set; }
        public ReadHotelDto Hotel { get; set; }
        public StatusDto Status { get; set; }
        public string CheckInDateDesc
        {
            get => CheckIn.ToString("dd/MMMM/yyyy");
        }
        public string CheckOutDateDesc
        {
            get => CheckOut.ToString("dd/MMMM/yyyy");
        }
    }

    public class CreateUpdateBookingDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public decimal Price { get; set; }
        public int HotelId { get; set; }
        public int StatusId { get; set; }
    }

    public class QueryBookingDto
    {
        [Query(Operation.Contains)]
        public string? FirstName { get; set; }

        [Query(Operation.Contains)]
        public string? LastName { get; set; }

        [Query("CheckIn", Operation.GreaterThanOrEqual)]
        public DateTime? CheckInFrom { get; set; }

        [Query("CheckIn", Operation.LessThanOrEqual)]
        public DateTime? CheckInTo { get; set; }

        [Query("CheckOut", Operation.GreaterThanOrEqual)]
        public DateTime? CheckOutFrom { get; set; }

        [Query("CheckOut", Operation.LessThanOrEqual)]
        public DateTime? CheckOutTo { get; set; }

        [Query("Price", Operation.GreaterThanOrEqual)]
        public decimal? FromPrice { get; set; }

        [Query("Price", Operation.LessThanOrEqual)]
        public decimal? ToPrice { get; set; }

        [Query(Operation.Equal)]
        public int? StatusId { get; set; }

        [Query(Operation.Equal)]
        public int? HotelId { get; set; }
    }
}
