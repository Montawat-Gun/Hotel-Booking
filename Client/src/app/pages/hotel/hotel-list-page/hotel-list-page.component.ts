import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, SortEvent } from 'primeng/api';
import { IHotel, IHotelCriteria } from 'src/app/pages/hotel/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { finalize, Observable, Subject, switchMap, tap } from 'rxjs';
import { LazyLoadResult } from 'src/app/interfaces/lazyload.interface';
import { ConfirmDeleteConfig, DefualtLazyloadConfig } from 'src/app/app.config';
import { DropdownInput } from 'src/app/helpers/inputs/dropdown-input';
import { BaseInput } from 'src/app/helpers/inputs/base-input';
import { TextInput } from 'src/app/helpers/inputs/text-input';
import { ProvinceService } from 'src/app/services/province.service';
import { IDynamicForm } from 'src/app/components/dynamic-form/interfaces/dynamic-form.interface';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-hotel-list-page',
  templateUrl: './hotel-list-page.component.html',
  styleUrls: ['./hotel-list-page.component.scss']
})
export class HotelListPageComponent implements OnInit {
  @ViewChild('dynamicForm', { static: false }) dynamicForm!: DynamicFormComponent;

  breadcrumbItems: MenuItem[] = [];

  cols: { field: string, header: string }[] = [];

  data: IHotel[] = [];
  virtualData: IHotel[] = [];

  search$!: Observable<LazyLoadResult<IHotel[]>>;
  criteria$ = new Subject<IHotelCriteria>();

  count!: number;
  defualtRow: number = DefualtLazyloadConfig.rows;
  first: number = DefualtLazyloadConfig.first;
  rows: number = DefualtLazyloadConfig.rows;

  reload: boolean = true;
  loading: boolean = false;
  saerchData: IHotelCriteria = {
    first: 0,
    rows: 5,
  };

  inputs: BaseInput[] = [
    new TextInput({
      key: 'name',
      label: 'ชื่อโรงแรม',
    }),
    new DropdownInput({
      key: 'provinceId',
      label: 'จังหวัด',
      placeholder: 'กรุณาเลือกจังหวัด',
      showClear: true,
      filter: true,
      filterBy: 'name',
      onChange: (e) => this.onProvinceChange(e)
    }),
    new DropdownInput({
      key: 'amphureId',
      label: 'อำเภอ',
      disabled: true,
      placeholder: 'กรุณาเลือกอำเภอ',
      showClear: true,
      onChange: (e) => this.onAmphureChange()
    }),
    new DropdownInput({
      key: 'tumbolId',
      label: 'ตำบล',
      disabled: true,
      showClear: true,
      placeholder: 'กรุณาเลือกตำบล',
    }),
  ];

  option: IDynamicForm = {
    inputs: this.inputs,
    submitButtonText: "ค้นหา",
  }

  constructor(
    public hotelService: HotelService,
    private provinceService: ProvinceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { icon: 'pi pi-home' },
      { label: 'Hotel' },
    ];

    this.provinceService.getProvinces()
      .subscribe((res) => {
        const values = res.map(x => { return { key: x.id, value: x.name } });
        this.dynamicForm.setOptions('provinceId', values);
      });

    this.cols = Array(5).fill({ field: '', header: '' });

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
        if (this.reload) {
          this.count = res.count;
          this.virtualData = Array.from({ length: this.count });
          this.reload = false;
        }
        if (this.rows >= this.count) {
          this.rows == this.count;
        }
        this.virtualData.splice(this.first, this.rows, ...res.data);
        this.virtualData = [...this.virtualData];
      })


  }

  onProvinceChange(e: any) {
    const provinceId = this.dynamicForm.getData.provinceId;
    if (provinceId)
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
    if (amphureId)
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

  onSearch(searchData: IHotelCriteria) {
    this.reload = true;
    searchData.first = this.first = DefualtLazyloadConfig.first;
    searchData.rows = this.rows = DefualtLazyloadConfig.rows;
    this.loading = true;
    this.saerchData = searchData;
    this.criteria$.next(searchData);
  }

  customSort(event: SortEvent) {
    this.reload = true;
    this.saerchData.sortField = event.field;
    this.saerchData.sortOrder = event.order;
    this.saerchData.rows = this.rows = DefualtLazyloadConfig.rows;
    this.saerchData.first = this.first = DefualtLazyloadConfig.first;
    this.criteria$.next(this.saerchData);
  }

  onLoadLazy(event: LazyLoadEvent) {
    this.first = this.saerchData.first = Number(event.first);
    this.rows = this.saerchData.rows = Number(event.rows);
    this.criteria$.next(this.saerchData);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      ...ConfirmDeleteConfig,
      accept: () => {
        this.hotelService.delete(id)
          .subscribe(() => {
            this.onSearch(this.saerchData);
            this.messageService.add({ severity: 'success', summary: 'บันทึกสำเร็จ' });
          });
      }
    })
  }
}
