# Hotel Booking

Demo webapp using .net core 6 and angular 13 with primeng.

## Installation for client

```bash
npm i
ng serve
```

## Installation for .Net
By defualt this project use inmemory database for use real DB uncomment at position 1 and then comment at position 2 
in ServicesConfiguration.cs

```csharp
            /* Uncomment here for use DB */
1-------->  //services.AddDbContext<DataContext>(options =>
            //    options.UseSqlServer(
            //        configuration.GetConnectionString("HotelBookingDB"),
            //        x => x.MigrationsAssembly("BL")
            //    ));

            /* Comment here for use sql server */
2-------->  services.AddDbContext<DataContext>(options =>
                options.UseInMemoryDatabase("HotelBookingDB"));
```

** Use only when entity has modify. **
```bash
dotnet ef --startup-project WebAPI --project BL migrations add <MigrationName> -o Data/Migrations
```

## Contributing
#### Create by [Montawat-Gun](https://github.com/Montawat-Gun)
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/Montawat-Gun/Hotel-Booking/blob/main/LICENSE)
