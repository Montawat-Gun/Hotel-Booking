using BL.DTOs;
using BL.Entities;
using BL.Services;

namespace WebAPI.Controllers
{
    public class HotelController : EntityController<int, Hotel, ReadHotelDto, CreateHotelDto, UpdateHotelDto>
    {
        public HotelController(IEntityService<int, Hotel, ReadHotelDto, CreateHotelDto, UpdateHotelDto> entity) : base(entity)
        {
        }
    }
}
