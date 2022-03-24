import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
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
  first: number = DefualtLazyloadConfig.first;
  rows: number = DefualtLazyloadConfig.rows;

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
      console.log(this.route.snapshot.data['data'])
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
        this.count = res.count;
        this.virtualData = Array.from({ length: this.count });
        if (this.rows >= this.count) {
          this.rows == this.count;
        }
        this.virtualData.splice(this.first, this.rows, ...res.data);
        this.virtualData = [...this.virtualData];
      })
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
    this.first = DefualtLazyloadConfig.first;
    this.rows = DefualtLazyloadConfig.rows;
    searchData.first = this.first;
    searchData.rows = this.rows;
    this.loading = true;
    this.saerchData = searchData;
    this.criteria$.next(searchData);
  }

  onLoadLazy(event: LazyLoadEvent) {
    this.first = Number(event.first);
    this.rows = Number(event.rows);
    this.saerchData.first = this.first;
    this.saerchData.rows = this.rows;
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
