using BL.DTOs;
using BL.Entities;
using BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    public class BookingController : EntityController<long, Booking, ReadBookingDto, CreateUpdateBookingDto, CreateUpdateBookingDto, QueryBookingDto>
    {
        private readonly IBookingService _booking;

        public BookingController(IBookingService booking) : base(booking)
        {
            _booking = booking;
        }

        [HttpPost("DeleteRange")]
        public ActionResult DeleteRange(ValueDto<long[]> keys)
        {
            _booking.DeleteRange(keys.Data);
            return Ok();
        }
    }
}
