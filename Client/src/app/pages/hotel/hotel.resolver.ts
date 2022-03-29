import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { IAmphure, IProvince, ITumbol } from 'src/app/interfaces/province.interface';
import { IHotel } from 'src/app/pages/hotel/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { ProvinceService } from 'src/app/services/province.service';

@Injectable({
  providedIn: 'root'
})
export class HotelResolver implements Resolve<{ data: IHotel, province: IProvince, amphure: IAmphure, tumbol: ITumbol }> {

  constructor(
    private service: HotelService,
    private provinceService: ProvinceService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<{ data: IHotel, province: IProvince, amphure: IAmphure, tumbol: ITumbol }> {
    const obs = (data: IHotel) => {
      return {
        province: this.provinceService.getProvincesById(data.provinceId!),
        amphure: this.provinceService.getAmphureById(data.amphureId!),
        tumbol: this.provinceService.getTumbolById(data.tumbolId!),
      }
    }

    const id = Number(route.paramMap.get('id'));
    return this.service.getById(id)
      .pipe(switchMap((res) => forkJoin(obs(res))
        .pipe(map(({ province, amphure, tumbol }) => {
          return { data: res, province: province, amphure: amphure, tumbol: tumbol }
        }))));
  }
}
