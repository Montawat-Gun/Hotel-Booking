import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { finalize, map, Observable, Subject, switchMap } from 'rxjs';
import { ConfirmDeleteConfig, ConfirmSaveConfig, DefualtLazyloadConfig } from 'src/app/app.config';
import { LazyLoadResult } from 'src/app/interfaces/lazyload.interface';
import { BookingService } from 'src/app/services/booking.service';
import { IHotel } from '../../hotel/interfaces/hotel.interface';
import { BookingEditComponent } from '../booking-edit/booking-edit.component';
import { BookingSearchFormComponent } from '../components/booking-search-form/booking-search-form.component';
import { IBooking, IBookingCriteria } from '../interfaces/booking.interface';
import { IStatus } from '../interfaces/status.interface';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm!: BookingSearchFormComponent;
  @ViewChild('btnCancelEdit') btnCancelEdit!: ElementRef;
  breadcrumbItems: MenuItem[] = [];

  cols: { field: string, header: string }[] = [];
  hotelId!: number;
  hotelData!: IHotel;
  virtualData: IBooking[] = [];

  statuses: IStatus[] = [];

  search$!: Observable<LazyLoadResult<IBooking[]>>;
  criteria$ = new Subject<IBookingCriteria>();

  count!: number;
  defualtRow: number = DefualtLazyloadConfig.rows;
  first: number = DefualtLazyloadConfig.first;
  rows: number = DefualtLazyloadConfig.rows;

  selectedValues: IBooking[] = [];

  loading: boolean = false;
  saerchData: IBookingCriteria = {
    hotelId: this.hotelId,
    first: 0,
    rows: 5,
  };

  constructor(
    private bookingService: BookingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
      this.hotelData = this.route.snapshot.data['data'].data;
    }

    this.http.get<IStatus[]>('values/getStatuses')
      .subscribe((res) => this.statuses = res);

    this.breadcrumbItems = [
      { icon: 'pi pi-home', routerLink: '/' },
      { label: 'Hotel', routerLink: '/' },
      { label: 'Booking' },
    ];

    this.cols = [
      { field: '', header: '' },
      { field: '', header: '' },
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
          this.bookingService.getList(criteria || { first: this.first, rows: this.rows })
            .pipe(finalize(() => {
              if (this.loading) {
                this.loading = false;
              }
            }), map((res) => {
              res.data.forEach(x => {
                x.checkIn = new Date(x.checkIn!);
                x.checkOut = new Date(x.checkOut!);
                switch (x.status?.id) {
                  case 1:
                    x.status.color = "info"; break;
                  case 2:
                    x.status.color = "success"; break;
                  case 3:
                    x.status.color = "warning"; break;
                  case 4:
                    x.status.color = "danger"; break;
                }
              })
              return { count: res.count, data: res.data }
            }))
        ),
      );

    this.search$
      .subscribe((res) => {
        if (!this.count || this.count !== res.count) {
          this.count = res.count;
          this.virtualData = Array.from({ length: this.count });
        }
        if (this.rows >= this.count) {
          this.rows == this.count;
        }
        this.virtualData.splice(this.first, this.rows, ...res.data);
        this.virtualData = [...this.virtualData];
      });
  }

  onSearch(searchData: IBookingCriteria) {
    if (searchData.checkInFrom) {
      searchData.checkInFrom = moment(searchData.checkInFrom).format("yyyy-MM-DD");
    }
    if (searchData.checkInTo) {
      searchData.checkInTo = moment(searchData.checkInTo).format("yyyy-MM-DD");
    }
    if (searchData.checkOutFrom) {
      searchData.checkOutFrom = moment(searchData.checkOutFrom).format("yyyy-MM-DD");
    }
    if (searchData.checkOutTo) {
      searchData.checkOutTo = moment(searchData.checkOutTo).format("yyyy-MM-DD");
    }

    searchData.first = this.first = DefualtLazyloadConfig.first;
    searchData.rows = this.rows = DefualtLazyloadConfig.rows;
    this.loading = true;
    this.saerchData = searchData;
    searchData.hotelId = this.hotelId;
    this.criteria$.next(searchData);
  }

  customSort(event: SortEvent) {
    this.saerchData.sortField = event.field;
    this.saerchData.sortOrder = event.order;
    this.saerchData.rows = this.rows = DefualtLazyloadConfig.rows;
    this.saerchData.first = this.first = DefualtLazyloadConfig.first;
    this.criteria$.next(this.saerchData);
  }

  onLoadLazy(event: LazyLoadEvent) {
    this.first = this.saerchData.first = Number(event.first);
    this.rows = this.saerchData.rows = Number(event.rows);
    this.saerchData.hotelId = this.hotelId;
    this.criteria$.next(this.saerchData);
  }

  onOpenAdd() {
    const ref = this.dialogService.open(BookingEditComponent, {
      data: { hotelId: this.hotelId, statuses: this.statuses },
      header: 'Add booking',
      width: '70%',
      height: '90%',
    });

    ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.searchForm.onSearch();
      }
    });
  }

  onSelectionChange(values: IBooking[]) {
    this.selectedValues = values;
  }

  onEditInit() {
    this.btnCancelEdit?.nativeElement.click();
  }

  onSaveEdit(data: IBooking) {
    this.confirmationService.confirm({
      ...ConfirmSaveConfig,
      accept: () => {
        this.loading = true;
        data.hotelId = data.hotel?.id;
        data.statusId = data.status?.id!;
        this.bookingService.createUpdateDto(Number(data.id), data)
          .pipe(finalize(() => this.loading = false))
          .subscribe(() => {
            this.btnCancelEdit?.nativeElement.click();
            this.searchForm.onSearch();
            this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
          });
      }
    })
  }

  onCancelEdit(data: IBooking) {
    this.criteria$.next(this.saerchData);
  }

  onDeleteItems() {
    let confirmOptions = ConfirmDeleteConfig;
    confirmOptions.message = `ลบ ${this.selectedValues.length} รายการ`
    this.confirmationService.confirm({
      ...confirmOptions,
      accept: () => {
        this.bookingService.deleteRange(this.selectedValues.filter(x => x.id).map(x => x.id!))
          .subscribe(() => {
            this.searchForm.onSearch();
            this.selectedValues = [];
            this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
          });
      }
    });
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      ...ConfirmDeleteConfig,
      accept: () => {
        this.bookingService.delete(id)
          .subscribe(() => {
            this.searchForm.onSearch();
            this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
          });
      }
    })
  }

}
