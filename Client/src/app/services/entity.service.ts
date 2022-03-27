import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyLoadResult } from '../interfaces/lazyload.interface';

@Injectable({
  providedIn: 'root'
})
export class EntityService<TKey, TReadDto, TCreateUpdateDto, TSearchDto> {

  constructor(
    @Inject(String) protected url: string,
    protected http: HttpClient,
  ) { }

  getList(criteria: TSearchDto) {
    let params = new HttpParams();
    Object.keys(criteria).forEach(function (key) {
      if ((criteria as any)[key] != null && (criteria as any)[key] != undefined && key !== 'filters')
        params = params.append(key, (criteria as any)[key]);
    });
    return this.http.get<LazyLoadResult<TReadDto[]>>(this.url, { params: params });
  }

  getById(id: TKey) {
    return this.http.get<TReadDto>(this.url + id);
  }

  createUpdateDto(id: TKey, data: TCreateUpdateDto) {
    if (id == null) {
      return this.http.post<TReadDto>(this.url, data);
    }
    else {
      return this.http.put<TReadDto>(this.url + id, data);
    }
  }

  delete(id: TKey) {
    return this.http.delete(this.url + id);
  }
}