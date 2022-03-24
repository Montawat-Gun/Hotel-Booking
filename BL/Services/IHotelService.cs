using BL.DTOs;
using BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public interface IHotelService : IEntityService<int, Hotel, ReadHotelDto, CreateUpdateHotelDto, CreateUpdateHotelDto, QueryHotelDto>
    {
    }
}
