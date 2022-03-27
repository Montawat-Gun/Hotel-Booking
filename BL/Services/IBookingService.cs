using BL.DTOs;
using BL.Entities;

namespace BL.Services
{
    public interface IBookingService : IEntityService<long, Booking, ReadBookingDto, CreateUpdateBookingDto, CreateUpdateBookingDto, QueryBookingDto>
    {
        public void DeleteRange(long[] keys);
    }
}
