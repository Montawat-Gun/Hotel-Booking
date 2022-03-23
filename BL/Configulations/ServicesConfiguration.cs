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
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("HotelBookingDB"),
                    x => x.MigrationsAssembly("BL")
                ));

            using (ServiceProvider serviceProvider = services.BuildServiceProvider())
            {
                // Update Database.
                var context = serviceProvider.GetRequiredService<DataContext>();
                context.Database.Migrate();
                SeedData.Seed(context);
            }

            //Add services.
            services.AddScoped(typeof(IEntityService<,,,,,>), typeof(EntityService<,,,,,>));
            services.AddScoped<IHotelService, HotelService>();
            services.AddScoped<ProvinceService>();

            return services;
        }
    }
}
