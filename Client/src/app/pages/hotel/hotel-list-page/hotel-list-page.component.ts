import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, SortEvent } from 'primeng/api';
import { IHotel, IHotelCriteria } from 'src/app/pages/hotel/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelSearchFormComponent } from '../component/hotel-search-form/hotel-search-form.component';
import { finalize, Observable, Subject, switchMap } from 'rxjs';
import { LazyLoadResult } from 'src/app/interfaces/lazyload.interface';
import { ConfirmDeleteConfig, DefualtLazyloadConfig } from 'src/app/app.config';

@Component({
  selector: 'app-hotel-list-page',
  templateUrl: './hotel-list-page.component.html',
  styleUrls: ['./hotel-list-page.component.scss']
})
export class HotelListPageComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm!: HotelSearchFormComponent;

  breadcrumbItems: MenuItem[] = [];

  cols: { field: string, header: string }[] = [];

  data: IHotel[] = [];
  virtualData: IHotel[] = [];

  search$!: Observable<LazyLoadResult<IHotel[]>>;
  criteria$ = new Subject<IHotelCriteria>();

  count!: number;
  first: number = DefualtLazyloadConfig.first;
  rows: number = DefualtLazyloadConfig.rows;

  loading: boolean = false;
  saerchData: IHotelCriteria = {
    first: 0,
    rows: 5,
  };

  constructor(
    private hotelService: HotelService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { icon: 'pi pi-home' },
      { label: 'Hotel' },
    ];

    this.cols = [
      { field: '', header: '' },
      { field: '', header: '' },
      { field: '', header: '' },
      { field: '', header: '' },
      { field: '', header: '' },
    ];

    this.loading = true;
    this.search$ = this.criteria$
      .pipe(
        switchMap((criteria) =>
          this.hotelService.getList(criteria || { first: this.first, rows: this.rows })
            .pipe(finalize(() => {
              if (this.loading) {
                this.loading = false;
              }
            }))
        ),
      );

    this.search$
      .subscribe((res) => {
        this.count = res.count;
        this.virtualData = Array.from({ length: this.count });
        if (this.rows >= this.count) {
          this.rows == this.count;
        }
        this.virtualData.splice(this.first, this.rows, ...res.data);
        this.virtualData = [...this.virtualData];
      })
  }

  onSearch(searchData: IHotelCriteria) {
    this.first = DefualtLazyloadConfig.first;
    this.rows = DefualtLazyloadConfig.rows;
    searchData.first = this.first;
    searchData.rows = this.rows;
    this.loading = true;
    this.saerchData = searchData;
    this.criteria$.next(searchData);
  }

  customSort(event: SortEvent) {
    this.saerchData.sortField = event.field;
    this.saerchData.sortOrder = event.order;
    this.criteria$.next(this.saerchData);
  }

  onLoadLazy(event: LazyLoadEvent) {
    this.first = Number(event.first);
    this.rows = Number(event.rows);
    this.saerchData.first = this.first;
    this.saerchData.rows = this.rows;
    this.criteria$.next(this.saerchData);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      ...ConfirmDeleteConfig,
      accept: () => {
        this.hotelService.delete(id)
          .subscribe(() => {
            this.searchForm.onSearch();
            this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
          });
      }
    })
  }
}
