using BL.Data;
using BL.Helpers;
using BL.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BL.Configulations
{
    public static class ServicesConfiguration
    {
        public static IServiceCollection AddConfigs(this IServiceCollection services, IConfiguration configuration)
        {
            /* Uncomment here for use DB */
            //services.AddDbContext<DataContext>(options =>
            //    options.UseSqlServer(
            //        configuration.GetConnectionString("HotelBookingDB"),
            //        x => x.MigrationsAssembly("BL")
            //    ));

            /* Comment here for use sql server */
            services.AddDbContext<DataContext>(options =>
                options.UseInMemoryDatabase("HotelBookingDB"));

            //Add services.
            services.AddScoped(typeof(IEntityService<,,,,,>), typeof(EntityService<,,,,,>));
            services.AddScoped<IHotelService, HotelService>();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<ProvinceService>();

            using (ServiceProvider serviceProvider = services.BuildServiceProvider())
            {
                // Update Database.
                var context = serviceProvider.GetRequiredService<DataContext>();
                var province = serviceProvider.GetRequiredService<ProvinceService>();
                if (context.Database.ProviderName != "Microsoft.EntityFrameworkCore.InMemory")
                {
                    context.Database.Migrate();
                }
                SeedData.Seed(context, province);
            }

            return services;
        }
    }
}
