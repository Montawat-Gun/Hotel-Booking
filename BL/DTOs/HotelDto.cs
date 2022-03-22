using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTOs
{
    public class ReadHotelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProvinceId { get; set; }
        public int AmphureId { get; set; }
        public int TumbolId { get; set; }
    }
    public class CreateHotelDto
    {
        public string Name { get; set; }
        public int ProvinceId { get; set; }
        public int AmphureId { get; set; }
        public int TumbolId { get; set; }
    }

    public class UpdateHotelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProvinceId { get; set; }
        public int AmphureId { get; set; }
        public int TumbolId { get; set; }
    }
}