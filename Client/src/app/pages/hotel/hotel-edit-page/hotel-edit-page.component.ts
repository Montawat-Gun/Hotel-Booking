import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { IHotel } from 'src/app/pages/hotel/component/hotel-search-form/interfaces/hotel.interface';
import { IAmphure, IProvince, ITumbol } from 'src/app/interfaces/province.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-hotel-edit-page',
  templateUrl: './hotel-edit-page.component.html',
  styleUrls: ['./hotel-edit-page.component.scss']
})
export class HotelEditPageComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];

  id!: number;
  isSubmited: boolean = false;
  isLoading: boolean = false;
  data!: IHotel;

  formEdit: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    provinceId: new FormControl(null, Validators.required),
    amphureId: new FormControl({ value: null, disabled: true }, Validators.required),
    tumbolId: new FormControl({ value: null, disabled: true }, Validators.required),
  });

  provinces: IProvince[] = [];
  amphures: IAmphure[] = [];
  tumbols: ITumbol[] = [];

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
      this.data = this.route.snapshot.data['hotel'];
      console.log(this.data)
      this.init(this.data);
    }
    this.breadcrumbItems = [
      { icon: 'pi pi-home', routerLink: '/' },
      { label: 'Hotel', routerLink: '/' },
      { label: this.id ? 'Edit' : 'Add' },
    ];

    this.provinceService.getProvinces().subscribe((res) => {
      this.provinces = res;
    });
  }

  init(data: IHotel) {
    if (data) {
      const obs = {
        province: this.provinceService.getProvincesById(data.provinceId!),
        amphure: this.provinceService.getAmphureById(data.amphureId!),
        tumbol: this.provinceService.getTumbolById(data.tumbolId!),
      }

      forkJoin(obs).subscribe(({ province, amphure, tumbol }) => {
        this.amphures.push(amphure);
        this.tumbols.push(tumbol);
        this.formEdit = this.formBuilder.group({
          name: [data.name, [Validators.required]],
          provinceId: new FormControl({ value: province.id, disabled: true }, Validators.required),
          amphureId: new FormControl({ value: amphure.id, disabled: true }, Validators.required),
          tumbolId: new FormControl({ value: tumbol.id, disabled: true }, Validators.required),
        });
      });
    }
  }

  onProvinceChange(e: any) {
    this.isSubmited = false;
    const provinceId = this.formEdit.controls['provinceId'].value;
    this.provinceService.getAmphures(provinceId)
      .subscribe((res) => {
        this.amphures = res;
        this.formEdit.patchValue({
          amphureId: null,
          tumbolId: null
        });
        this.formEdit.controls['amphureId'].enable()
      })
  }

  onAmphureChange(e: any) {
    this.isSubmited = false;
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
    this.hotelService.createUpdateDto(this.id, this.formEdit.value)
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
