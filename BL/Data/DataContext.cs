using BL.Entities;
using Microsoft.EntityFrameworkCore;

namespace BL.Data
{
    internal class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        public DbSet<Status> STATUS { get; set; }
        public DbSet<Booking> BOOKING { get; set; }
        public DbSet<Hotel> HOTEL { get; set; }
    }
}
