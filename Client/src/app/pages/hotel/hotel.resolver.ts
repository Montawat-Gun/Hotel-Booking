import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IHotel } from 'src/app/pages/hotel/component/hotel-search-form/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Injectable({
  providedIn: 'root'
})
export class HotelResolver implements Resolve<IHotel> {

  constructor(
    private service: HotelService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHotel> {
    const id = Number(route.paramMap.get('id'));
    return this.service.getById(id);
  }
}
