using BL.Helpers.Attributes;

namespace BL.DTOs
{
    public class ReadHotelDto : AuditableDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProvinceId { get; set; }
        public int AmphureId { get; set; }
        public int TumbolId { get; set; }
        public string Address { get; set; }
    }
    public class CreateUpdateHotelDto
    {
        public string Name { get; set; }
        public int ProvinceId { get; set; }
        public int AmphureId { get; set; }
        public int TumbolId { get; set; }
    }

    public class QueryHotelDto
    {
        [Query(Operation.Contains)]
        public string? Name { get; set; }

        [Query(Operation.Equal)]
        public int? ProvinceId { get; set; }

        [Query(Operation.Equal)]
        public int? AmphureId { get; set; }

        [Query(Operation.Equal)]
        public int? TumbolId { get; set; }
    }
}