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

        public void DeleteRange(long[] keys)
        {
            var booking = _entties.Where(x => keys.Contains(x.Id)).ToList();
            _entties.RemoveRange(booking);
            _context.SaveChanges();
        }
    }
}
