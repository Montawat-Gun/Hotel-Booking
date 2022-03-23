import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { IHotel, IHotelCriteria } from 'src/app/pages/hotel/component/hotel-search-form/interfaces/hotel.interface';
import { IAmphure, IProvince, ITumbol } from 'src/app/interfaces/province.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelSearchFormComponent } from '../component/hotel-search-form/hotel-search-form.component';
import { finalize, Observable, Subject, switchMap } from 'rxjs';
import { LazyLoadResult } from 'src/app/interfaces/lazyload.interface';

@Component({
  selector: 'app-hotel-list-page',
  templateUrl: './hotel-list-page.component.html',
  styleUrls: ['./hotel-list-page.component.scss']
})
export class HotelListPageComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm!: HotelSearchFormComponent;

  breadcrumbItems: MenuItem[] = [];

  cols: { field: string, header: string, showField: boolean }[] = [];

  totalRecords!: number;
  data: IHotel[] = [];
  virtualData: IHotel[] = [];

  search$!: Observable<LazyLoadResult<IHotel[]>>;
  criteria$ = new Subject<IHotelCriteria>();

  rows: number = 5;
  first: number = 0;

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
      { field: 'name', header: 'ชื่อโรงแรม', showField: true },
      { field: 'address', header: 'ที่อยู่', showField: true },
      { field: 'id', header: 'Action', showField: false },
    ];

    this.search$ = this.criteria$
      .pipe(
        switchMap((criteria) =>
          this.hotelService.getList(criteria || { first: this.first, rows: this.rows })
        ),
      );

    this.search$
      .subscribe((res) => {
        this.data = [...res.data];
        this.totalRecords = res.count;
      })
  }

  onSearch(e: any) {

  }

  onLoadLazy(event: LazyLoadEvent) {
    console.log('lazy load', event)
    this.first = Number(event.first);
    this.rows = Number(event.rows);
    this.criteria$.next(event);

  }

  onOpen(id: number) {

  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'ลบรายการนี้',
      icon: PrimeIcons.TRASH,
      acceptLabel: 'ตกลง',
      rejectLabel: 'ยกเลิก',
      acceptButtonStyleClass: 'p-button-sm p-button-danger',
      rejectButtonStyleClass: 'p-button-sm p-button-secondary',
      dismissableMask: true,
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
