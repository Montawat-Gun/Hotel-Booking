﻿using BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    internal class BookingService : IBookingService
    {
        public Booking GetAll()
        {
            return new Booking();
        }
    }
}
