import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { IProvince, IAmphure, ITumbol } from '../interfaces/province.interface';
import { IHotel, IHotelCriteria } from '../pages/hotel/interfaces/hotel.interface';
import { EntityService } from './entity.service';
import { ProvinceService } from './province.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService extends EntityService<number, IHotel, IHotel, IHotelCriteria> {

  override url: string = 'Hotel/';
  constructor(
    protected override http: HttpClient,
    private provinceService: ProvinceService,
  ) {
    super(http);
  }

  getData(id: number): Observable<{ data: IHotel, province: IProvince, amphure: IAmphure, tumbol: ITumbol }> {
    const obs = (data: IHotel) => {
      return {
        province: this.provinceService.getProvincesById(data.provinceId!),
        amphure: this.provinceService.getAmphureById(data.amphureId!),
        tumbol: this.provinceService.getTumbolById(data.tumbolId!),
      }
    }

    return super.getById(id)
      .pipe(switchMap((res) => forkJoin(obs(res))
        .pipe(map(({ province, amphure, tumbol }) => {
          return { data: res, province: province, amphure: amphure, tumbol: tumbol }
        }))));
  }
}
