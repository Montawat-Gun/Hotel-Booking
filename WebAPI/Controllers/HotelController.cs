using BL.Data;
using BL.DTOs;
using BL.Entities;
using BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    public class HotelController : EntityController<int, Hotel, ReadHotelDto, CreateUpdateHotelDto, CreateUpdateHotelDto, QueryHotelDto>
    {
        public HotelController(IHotelService hotel) : base(hotel)
        {
        }
    }
}
