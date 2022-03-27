import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking, IBookingCriteria } from '../pages/booking/interfaces/booking.interface';
import { EntityService } from './entity.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends EntityService<number, IBooking, IBooking, IBookingCriteria>{

  constructor(
    protected override http: HttpClient,
  ) {
    const url: string = 'Booking/';
    super(url, http);
  }

  deleteRange(keys: number[]) {
    return this.http.post(this.url + 'deleteRange', { data: keys });
  }
}
