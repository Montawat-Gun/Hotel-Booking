import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAmphure, IProvince, ITumbol } from 'src/app/interfaces/province.interface';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'hotel-search-form',
  templateUrl: './hotel-search-form.component.html',
  styleUrls: ['./hotel-search-form.component.scss']
})
export class HotelSearchFormComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    provinceId: new FormControl(null),
    amphureId: new FormControl({ value: null, disabled: true }),
    tumbolId: new FormControl({ value: null, disabled: true }),
  });

  provinces: IProvince[] = [];
  amphures: IAmphure[] = [];
  tumbols: ITumbol[] = [];

  constructor(
    private provinceService: ProvinceService,
  ) { }

  ngOnInit(): void {
    this.provinceService.getProvinces().subscribe((res) => {
      this.provinces = res;
    });
  }

  onProvinceChange(e: any) {
    const provinceId = this.searchForm.controls['provinceId'].value;
    this.provinceService.getAmphures(provinceId)
      .subscribe((res) => {
        this.amphures = res;
        this.searchForm.patchValue({
          amphureId: null,
          tumbolId: null
        });
        this.searchForm.controls['amphureId'].enable()
      })
  }

  onAmphureChange(e: any) {
    const amphureId = this.searchForm.controls['amphureId'].value;
    this.provinceService.getTumbols(amphureId)
      .subscribe((res) => {
        this.tumbols = res;
        this.searchForm.patchValue({
          tumbolId: null
        });
        this.searchForm.controls['tumbolId'].enable()
      })
  }

  onSearch() {
    this.searchEvent.emit(this.searchForm.value);
  }

}
