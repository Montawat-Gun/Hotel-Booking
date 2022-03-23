import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHotel, IHotelCriteria } from '../pages/hotel/component/hotel-search-form/interfaces/hotel.interface';
import { EntityService } from './entity.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService extends EntityService<number, IHotel, IHotel, IHotelCriteria> {

  constructor(
    protected override http: HttpClient,
  ) {
    const url: string = 'Hotel/';
    super(url, http);
  }
}
