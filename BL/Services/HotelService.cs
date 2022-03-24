﻿using BL.Data;
using BL.DTOs;
using BL.Entities;

namespace BL.Services
{
    internal class HotelService : EntityService<int, Hotel, ReadHotelDto, CreateUpdateHotelDto, CreateUpdateHotelDto, QueryHotelDto>, IHotelService
    {
        private readonly ProvinceService _provinceService;
        public HotelService(DataContext context, ProvinceService provinceService) : base(context)
        {
            _provinceService = provinceService;
        }

        public override ReadHotelDto Add(Hotel entity)
        {
            var province = _provinceService.GetProviceById(entity.ProvinceId);
            var amphure = _provinceService.GetAmphureById(entity.AmphureId);
            var tumbol = _provinceService.GetTumbolById(entity.TumbolId);
            var tumbolName = tumbol.Name is null ? "" : tumbol.Name;
            var amphureName = amphure.Name is null ? "" : amphure.Name;
            var provinceName = province.Name is null ? "" : province.Name;
            entity.Address = $"{tumbolName} / {amphureName} / {provinceName}";
            return base.Add(entity);
        }

        public override ReadHotelDto Update(Hotel entity)
        {
            var province = _provinceService.GetProviceById(entity.ProvinceId);
            var amphure = _provinceService.GetAmphureById(entity.AmphureId);
            var tumbol = _provinceService.GetTumbolById(entity.TumbolId);
            var tumbolName = tumbol.Name is null ? "" : tumbol.Name;
            var amphureName = amphure.Name is null ? "" : amphure.Name;
            var provinceName = province.Name is null ? "" : province.Name;
            entity.Address = $"{tumbolName} / {amphureName} / {provinceName}";
            return base.Update(entity);
        }
    }
}
