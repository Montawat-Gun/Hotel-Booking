using BL.DTOs;
using BL.Entities;
using BL.Services;

namespace WebAPI.Controllers
{
    public class BookingController : EntityController<long, Booking, ReadBookingDto, CreateUpdateBookingDto, CreateUpdateBookingDto, QueryBookingDto>
    {
        public BookingController(IBookingService booking) : base(booking)
        {
        }
    }
}
