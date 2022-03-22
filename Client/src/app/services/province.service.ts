import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAmphure, IProvince, ITumbol } from '../interfaces/province.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(
    private http: HttpClient,
  ) { }

  getProvinces() {
    return this.http.get<IProvince[]>('province/GetProvinces');
  }

  getProvincesById(provinceId: number) {
    return this.http.get<IProvince>('province/GetProvinceById/' + provinceId);
  }

  getAmphures(provinceId: number) {
    return this.http.get<IAmphure[]>('province/GetAmphures/' + provinceId);
  }

  getAmphureById(amphureId: number) {
    return this.http.get<IAmphure>('province/GetAmphureById/' + amphureId);
  }

  getTumbols(amphureId: number) {
    return this.http.get<ITumbol[]>('province/GetTumbols/' + amphureId);
  }

  getTumbolById(tumbolId: number) {
    return this.http.get<ITumbol>('province/GetTumbolById/' + tumbolId);
  }
}
