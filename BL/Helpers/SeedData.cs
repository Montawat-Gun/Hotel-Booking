using BL.Data;
using BL.Entities;
using Newtonsoft.Json;

namespace BL.Helpers;

public static class SeedData
{
    public static void Seed(DataContext context)
    {
        SeedHotel(context);
    }

    private static void SeedHotel(DataContext context)
    {
        if (!context.HOTEL.Any())
        {
            using (StreamReader r = new StreamReader("files/json/hotel_data.json"))
            {
                string json = r.ReadToEnd();
                List<Hotel> items = JsonConvert.DeserializeObject<List<Hotel>>(json)!;
                items.ForEach(item =>
                {
                    item.Address = "Test / Test / Test";
                    item.CreateDate = DateTime.Now;
                    item.UpdateDate = DateTime.Now;
                });
                context.HOTEL.AddRange(items);
                context.SaveChanges();
            }
        }
    }
}
