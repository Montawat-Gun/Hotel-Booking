import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IStatus } from '../../interfaces/status.interface';

@Component({
  selector: 'booking-search-form',
  templateUrl: './booking-search-form.component.html',
  styleUrls: ['./booking-search-form.component.scss']
})
export class BookingSearchFormComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<any>();
  statuses: IStatus[] = [];

  searchForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    fromPrice: new FormControl(null),
    toPrice: new FormControl(null),
    checkInFrom: new FormControl(null),
    checkInTo: new FormControl(null),
    checkOutFrom: new FormControl(null),
    checkOutTo: new FormControl(null),
    statusId: new FormControl(null),
  });

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<IStatus[]>('values/getStatuses')
      .subscribe((res) => {
        this.statuses = res;
        this.statuses.unshift({ id: null, name: 'ทั้งหมด' });
      });
  }

  onSearch() {
    this.searchEvent.emit(this.searchForm.value);
  }

}
