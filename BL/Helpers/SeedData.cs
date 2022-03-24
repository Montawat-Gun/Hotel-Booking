using BL.Data;
using BL.Entities;
using BL.Services;
using Newtonsoft.Json;

namespace BL.Helpers;

public static class SeedData
{
    public static void Seed(DataContext context, ProvinceService provinceService)
    {
        SeedStatus(context);
        SeedHotel(context,provinceService);
        SeedBooking(context);
    }
    private static void SeedStatus(DataContext context)
    {
        if (!context.STATUS.Any())
        {
            using (StreamReader r = new StreamReader("files/json/status_data.json"))
            {
                string json = r.ReadToEnd();
                List<Status> items = JsonConvert.DeserializeObject<List<Status>>(json)!;
                context.STATUS.AddRange(items);
                context.SaveChanges();
            }
        }
    }

    private static void SeedHotel(DataContext context, ProvinceService _provinceService)
    {
        if (!context.HOTEL.Any())
        {
            using (StreamReader r = new StreamReader("files/json/hotel_data.json"))
            {
                string json = r.ReadToEnd();
                List<Hotel> items = JsonConvert.DeserializeObject<List<Hotel>>(json)!;
                items.ForEach(item =>
                {
                    var province = _provinceService.GetProviceById(item.ProvinceId);
                    var amphure = _provinceService.GetAmphureById(item.AmphureId);
                    var tumbol = _provinceService.GetTumbolById(item.TumbolId);
                    var tumbolName = tumbol.Name is null ? "" : tumbol.Name;
                    var amphureName = amphure.Name is null ? "" : amphure.Name;
                    var provinceName = province.Name is null ? "" : province.Name;
                    item.Address = $"{tumbolName} / {amphureName} / {provinceName}";
                    item.CreateDate = DateTime.Now;
                    item.UpdateDate = DateTime.Now;
                });
                context.HOTEL.AddRange(items);
                context.SaveChanges();
            }
        }
    }

    private static void SeedBooking(DataContext context)
    {
        if (!context.BOOKING.Any())
        {
            using (StreamReader r = new StreamReader("files/json/booking_data.json"))
            {
                string json = r.ReadToEnd();
                List<Booking> items = JsonConvert.DeserializeObject<List<Booking>>(json)!;
                context.BOOKING.AddRange(items);
                context.SaveChanges();
            }
        }
    }


}
