import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { IDynamicForm } from 'src/app/components/dynamic-form/interfaces/dynamic-form.interface';
import { BaseInput } from 'src/app/helpers/inputs/base-input';
import { CalendarInput } from 'src/app/helpers/inputs/calendar-input';
import { DropdownInput } from 'src/app/helpers/inputs/dropdown-input';
import { NumberInput } from 'src/app/helpers/inputs/number-input';
import { TextInput } from 'src/app/helpers/inputs/text-input';
import { BookingService } from 'src/app/services/booking.service';
import { IBooking } from '../interfaces/booking.interface';
import { IStatus } from '../interfaces/status.interface';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {
  @ViewChild('dynamicForm', { static: false }) dynamicForm!: DynamicFormComponent;

  loading: boolean = false;
  hotelId!: number;

  inputs: BaseInput[] = [
    new TextInput({
      key: 'firstName',
      label: 'ชื่อ',
      required: true,
      errorText: 'กรุณากรอกชื่อ',
    }),
    new TextInput({
      key: 'lastName',
      label: 'นามสกุล',
      required: true,
      errorText: 'กรุณากรอกนามสกุล',
    }),
    new CalendarInput({
      key: 'checkIn',
      label: 'วันที่เข้าพัก',
      required: true,
      errorText: 'กรุณาเลือกวันที่เข้าพัก',
    }),
    new CalendarInput({
      key: 'checkOut',
      label: 'วันที่ออก',
      required: true,
      errorText: 'กรุณาเลือกวันที่ออก',
    }),
    new NumberInput({
      key: 'price',
      value: null,
      label: 'ราคา',
      required: true,
      errorText: 'กรุณากรอกราคา',
      max: 100000,
      min: 0,
    }),
    new DropdownInput({
      key: 'statusId',
      label: 'สถานะ',
      required: true,
      errorText: 'กรุณาเลือกสถานะ',
      placeholder: 'กรุณาเลือกสถานะ',
    }),
  ];

  formOption: IDynamicForm = {
    inputs: this.inputs,
    showSubmitButton: false,
  }

  constructor(
    private bookingService: BookingService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.hotelId = this.config.data.hotelId;
    let statuses = this.config.data.statuses as IStatus[];
    this.dynamicForm.setOptions('statusId', statuses.map(x => { return { key: x.id!, value: x.name! } }));
    this.cd.detectChanges();
  }

  onSubmit() {
    this.dynamicForm.onSubmit();
  }

  onSave(data: IBooking) {
    data.hotelId = this.hotelId;
    this.loading = true;
    this.bookingService.createUpdateDto(null!, data)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
        this.ref.close(true);
      });
  }

  onBack() {
    this.ref.close(false);
  }

}
