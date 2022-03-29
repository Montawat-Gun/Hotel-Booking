import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ConfirmSaveConfig } from 'src/app/app.config';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { IDynamicForm } from 'src/app/components/dynamic-form/interfaces/dynamic-form.interface';
import { BaseInput } from 'src/app/helpers/inputs/base-input';
import { DropdownInput } from 'src/app/helpers/inputs/dropdown-input';
import { TextInput } from 'src/app/helpers/inputs/text-input';
import { IProvince, IAmphure, ITumbol } from 'src/app/interfaces/province.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { ProvinceService } from 'src/app/services/province.service';
import { IHotel } from '../interfaces/hotel.interface';

@Component({
  selector: 'app-hotel-edit-page',
  templateUrl: './hotel-edit-page.component.html',
  styleUrls: ['./hotel-edit-page.component.scss']
})
export class HotelEditPageComponent implements OnInit {
  @ViewChild('dynamicForm', { static: false }) dynamicForm!: DynamicFormComponent;

  id!: number;
  loading: boolean = false;
  breadcrumbItems: MenuItem[] = [];

  inputs: BaseInput[] = [
    new TextInput({
      key: 'name',
      label: 'ชื่อโรงแรม',
      required: true,
      errorText: 'กรุณากรอกชื่อโรงแรม',
    }),
    new DropdownInput({
      key: 'provinceId',
      label: 'จังหวัด',
      required: true,
      errorText: 'กรุณาเลือกจังหวัด',
      placeholder: 'กรุณาเลือกจังหวัด',
      onChange: (e) => this.onProvinceChange(e)
    }),
    new DropdownInput({
      key: 'amphureId',
      label: 'อำเภอ',
      required: true,
      disabled: true,
      errorText: 'กรุณาเลือกอำเภอ',
      placeholder: 'กรุณาเลือกอำเภอ',
      onChange: (e) => this.onAmphureChange()
    }),
    new DropdownInput({
      key: 'tumbolId',
      label: 'ตำบล',
      required: true,
      disabled: true,
      errorText: 'กรุณาเลือกตำบล',
      placeholder: 'กรุณาเลือกตำบล',
    }),
  ];

  formOption: IDynamicForm = {
    inputs: this.inputs,
    submitButtonText: "บันทึก",
    showCancelButton: true,
    cancelButtonText: 'ยกเลิก'
  }

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private provinceService: ProvinceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { icon: 'pi pi-home', routerLink: '/' },
      { label: 'Hotel', routerLink: '/' },
      { label: this.id ? 'Edit' : 'Add' },
    ];

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.hotelService.getData(this.id).subscribe((res) => {
        this.init(res);
      })
    }

    this.provinceService.getProvinces().subscribe((res) => {
      const values = res.map(x => { return { key: x.id, value: x.name } });
      this.dynamicForm.setOptions('provinceId', values);
    });
  }

  init(dataFromRoute: { data: IHotel, province: IProvince, amphure: IAmphure, tumbol: ITumbol }) {
    if (dataFromRoute.data) {
      this.dynamicForm.setData(dataFromRoute.data);
      this.dynamicForm.setDisable("provinceId");
      this.dynamicForm.setOptions("provinceId", [{ key: dataFromRoute.province.id, value: dataFromRoute.province.name }]);
      this.dynamicForm.setOptions("amphureId", [{ key: dataFromRoute.amphure.id, value: dataFromRoute.amphure.name }]);
      this.dynamicForm.setOptions("tumbolId", [{ key: dataFromRoute.tumbol.id, value: dataFromRoute.tumbol.name }]);
    }
  }

  onProvinceChange(e: any) {
    const provinceId = this.dynamicForm.getData.provinceId;
    this.provinceService.getAmphures(provinceId)
      .subscribe((res) => {
        const values = res.map(x => { return { key: x.id, value: x.name } });
        this.dynamicForm.setData({
          amphureId: null,
          tumbolId: null
        });
        this.dynamicForm.setOptions('amphureId', values);
        this.dynamicForm.setEnable('amphureId');
      })
  }

  onAmphureChange() {
    const amphureId = this.dynamicForm.getData.amphureId;
    this.provinceService.getTumbols(amphureId)
      .subscribe((res) => {
        const values = res.map(x => { return { key: x.id, value: x.name } });
        this.dynamicForm.setData({
          tumbolId: null
        });
        this.dynamicForm.setOptions('tumbolId', values);
        this.dynamicForm.setEnable("tumbolId")
      })
  }

  onSave(data: IHotel) {
    this.confirmationService.confirm({
      ...ConfirmSaveConfig,
      accept: () => {
        this.loading = true;
        this.hotelService.createUpdateDto(this.id, data)
          .pipe(finalize(() => this.loading = false))
          .subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
            this.onBack();
          });
      }
    })
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
