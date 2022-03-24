import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { IBooking } from '../interfaces/booking.interface';
import { IStatus } from '../interfaces/status.interface';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {
  id!: number;
  isSubmited: boolean = false;
  isLoading: boolean = false;
  hotelId!: number;

  statuses: IStatus[] = [];

  formEdit: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    checkIn: new FormControl(new Date(), Validators.required),
    checkOut: new FormControl(new Date(), Validators.required),
    price: new FormControl(null, Validators.required),
    hotelId: new FormControl(null, Validators.required),
    statusId: new FormControl(null, Validators.required),
  });

  constructor(
    private bookingService: BookingService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  get f() { return this.formEdit.controls; }

  ngOnInit(): void {
    this.hotelId = this.config.data.hotelId;
    this.statuses = this.config.data.statuses;
  }

  onSave() {
    this.formEdit.patchValue({
      hotelId: this.hotelId,
    });
    if (this.formEdit.invalid) {
      this.isSubmited = true;
    return;
    }
    this.isLoading = true;

    this.bookingService.createUpdateDto(null!, this.formEdit.getRawValue())
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
        this.ref.close(true);
      });
  }

  onBack() {
    this.ref.close(false);
  }

}
