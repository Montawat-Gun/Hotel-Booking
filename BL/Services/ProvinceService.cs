using BL.Entities;
using Newtonsoft.Json;

namespace BL.Services
{
    public class ProvinceService
    {
        public List<Province> GetProvices()
        {
            using (StreamReader r = new StreamReader("files/json/thai_provinces.json"))
            {
                string json = r.ReadToEnd();
                List<Province> items = JsonConvert.DeserializeObject<List<Province>>(json)!;
                return items;
            }
        }

        public Province? GetProviceById(int id)
        {
            using (StreamReader r = new StreamReader("files/json/thai_provinces.json"))
            {
                string json = r.ReadToEnd();
                List<Province> items = JsonConvert.DeserializeObject<List<Province>>(json)!;
                return items.FirstOrDefault(x => x.Id == id);
            }
        }

        public List<Amphure> GetAmphures()
        {
            using (StreamReader r = new StreamReader("files/json/thai_amphures.json"))
            {
                string json = r.ReadToEnd();
                List<Amphure> items = JsonConvert.DeserializeObject<List<Amphure>>(json)!;
                return items;
            }
        }

        public Amphure? GetAmphureById(int id)
        {
            using (StreamReader r = new StreamReader("files/json/thai_amphures.json"))
            {
                string json = r.ReadToEnd();
                List<Amphure> items = JsonConvert.DeserializeObject<List<Amphure>>(json)!;
                return items.FirstOrDefault(x => x.Id == id);
            }
        }

        public List<Amphure> GetAmphuresByProvinceId(int provinceId)
        {
            using (StreamReader r = new StreamReader("files/json/thai_amphures.json"))
            {
                string json = r.ReadToEnd();
                List<Amphure> items = JsonConvert.DeserializeObject<List<Amphure>>(json)!;
                return items.Where(x => x.ProvinceId == provinceId).ToList();
            }
        }

        public List<Tumbol> GetTumbols()
        {
            using (StreamReader r = new StreamReader("files/json/thai_tumbols.json"))
            {
                string json = r.ReadToEnd();
                List<Tumbol> items = JsonConvert.DeserializeObject<List<Tumbol>>(json)!;
                return items;
            }
        }

        public Tumbol? GetTumbolById(int id)
        {
            using (StreamReader r = new StreamReader("files/json/thai_tumbols.json"))
            {
                string json = r.ReadToEnd();
                List<Tumbol> items = JsonConvert.DeserializeObject<List<Tumbol>>(json)!;
                return items.FirstOrDefault(x => x.Id == id);
            }
        }

        public List<Tumbol> GetTumbolsByAmphureId(int amphureId)
        {
            using (StreamReader r = new StreamReader("files/json/thai_tumbols.json"))
            {
                string json = r.ReadToEnd();
                List<Tumbol> items = JsonConvert.DeserializeObject<List<Tumbol>>(json)!;
                return items.Where(x => x.AmphureId == amphureId).ToList();
            }
        }
    }
}
