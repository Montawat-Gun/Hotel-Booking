using BL.Data;
using BL.DTOs;
using BL.Entities;

namespace BL.Services
{
    internal class BookingService : EntityService<long, Booking, ReadBookingDto, CreateUpdateBookingDto, CreateUpdateBookingDto, QueryBookingDto>, IBookingService
    {
        public BookingService(DataContext context) : base(context)
        {
        }
    }
}
