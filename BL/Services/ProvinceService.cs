using BL.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class ProvinceService
    {
        public List<Province> GetProvices()
        {
            using (StreamReader r = new StreamReader("files/json/thai_provinces.json"))
            {
                string json = r.ReadToEnd();
                List<Province> items = JsonConvert.DeserializeObject<List<Province>>(json);
                return items;
            }
        }

        public List<Amphure> GetAmphure()
        {
            using (StreamReader r = new StreamReader("files/json/thai_amphures.json"))
            {
                string json = r.ReadToEnd();
                List<Amphure> items = JsonConvert.DeserializeObject<List<Amphure>>(json);
                return items;
            }
        }

        public List<Tumbol> GetTumbol()
        {
            using (StreamReader r = new StreamReader("files/json/thai_tumbols.json"))
            {
                string json = r.ReadToEnd();
                List<Tumbol> items = JsonConvert.DeserializeObject<List<Tumbol>>(json);
                return items;
            }
        }
    }
}
