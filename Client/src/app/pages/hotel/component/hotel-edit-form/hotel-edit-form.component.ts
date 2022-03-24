import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { IProvince, IAmphure, ITumbol } from 'src/app/interfaces/province.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { ProvinceService } from 'src/app/services/province.service';
import { IHotel } from '../../interfaces/hotel.interface';

@Component({
  selector: 'hotel-edit-form',
  templateUrl: './hotel-edit-form.component.html',
  styleUrls: ['./hotel-edit-form.component.scss']
})
export class HotelEditFormComponent implements OnInit {
  id!: number;
  isSubmited: boolean = false;
  isLoading: boolean = false;
  data!: IHotel;

  provinces: IProvince[] = [];
  amphures: IAmphure[] = [];
  tumbols: ITumbol[] = [];

  formEdit: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    provinceId: new FormControl(null, Validators.required),
    amphureId: new FormControl({ value: null, disabled: true }, Validators.required),
    tumbolId: new FormControl({ value: null, disabled: true }, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private provinceService: ProvinceService,
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  get f() { return this.formEdit.controls; }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      const dataFromRoute: { data: IHotel, province: IProvince, amphure: IAmphure, tumbol: ITumbol } = this.route.snapshot.data['data'];
      this.data = dataFromRoute.data;
      this.init(dataFromRoute);
    } else {
      this.provinceService.getProvinces().subscribe((res) => {
        this.provinces = res;
      });
    }
  }

  init(dataFromRoute: { data: IHotel, province: IProvince, amphure: IAmphure, tumbol: ITumbol }) {
    if (dataFromRoute.data) {
      this.provinces.push(dataFromRoute.province);
      this.amphures.push(dataFromRoute.amphure);
      this.tumbols.push(dataFromRoute.tumbol);
      this.formEdit = this.formBuilder.group({
        name: [dataFromRoute.data.name, [Validators.required]],
        provinceId: new FormControl({ value: dataFromRoute.province.id, disabled: true }, Validators.required),
        amphureId: new FormControl({ value: dataFromRoute.amphure.id, disabled: true }, Validators.required),
        tumbolId: new FormControl({ value: dataFromRoute.tumbol.id, disabled: true }, Validators.required),
      });
    }
  }

  clearError() {
    this.isSubmited = false;
  }

  onProvinceChange(e: any) {
    this.clearError();
    const provinceId = this.formEdit.controls['provinceId'].value;
    this.provinceService.getAmphures(provinceId)
      .subscribe((res) => {
        this.amphures = res;
        this.formEdit.patchValue({
          amphureId: null,
          tumbolId: null
        });
        this.formEdit.controls['amphureId'].enable();
      })
  }

  onAmphureChange(e: any) {
    this.clearError();
    const amphureId = this.formEdit.controls['amphureId'].value;
    this.provinceService.getTumbols(amphureId)
      .subscribe((res) => {
        this.tumbols = res;
        this.formEdit.patchValue({
          tumbolId: null
        });
        this.formEdit.controls['tumbolId'].enable()
      })
  }

  onSave() {
    if (this.formEdit.invalid) {
      this.isSubmited = true;
      return;
    }
    this.isLoading = true;

    this.hotelService.createUpdateDto(this.id, this.formEdit.getRawValue())
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
        this.onBack();
      });
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
