using BL.Data;
using BL.DTOs;
using BL.Entities;
using Mapster;

namespace BL.Services
{
    internal class BookingService : EntityService<long, Booking, ReadBookingDto, CreateUpdateBookingDto, CreateUpdateBookingDto, QueryBookingDto>, IBookingService
    {
        public BookingService(DataContext context) : base(context)
        {
        }

        public override ReadBookingDto Get(long id)
        {
            var result = _entties.ProjectToType<ReadBookingDto>().Where(x => x.Id == id).FirstOrDefault();
            return result;
        }
    }
}
