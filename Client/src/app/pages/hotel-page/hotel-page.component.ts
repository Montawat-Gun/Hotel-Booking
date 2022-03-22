import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IAmphure, IProvince, ITumbol } from 'src/app/interfaces/province.interface';
import { } from 'rxjs/operators'
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.scss']
})
export class HotelPageComponent implements OnInit {

  items: MenuItem[] = [];

  selectedProvince!: IProvince;
  selectedAmphure!: IAmphure;
  selectedTumbol!: ITumbol;

  provinces: IProvince[] = [];
  amphures: IAmphure[] = [];
  tumbols: ITumbol[] = [];

  constructor(
    private provinceService: ProvinceService
  ) { }

  ngOnInit() {
    this.items = [
      { icon: 'pi pi-home' },
      { label: 'Hotel' },
    ];

    this.provinceService.getProvinces().subscribe((res) => {
      this.provinces = res;
    });
  }

  onProvinceChange(e: any) {
    this.provinceService.getAmphures(this.selectedProvince.id)
      .subscribe((res) => {
        this.amphures = res;
      })
  }

  onAmphureChange(e: any) {
    this.provinceService.getTumbols(this.selectedAmphure.id)
      .subscribe((res) => {
        this.tumbols = res;
      })
  }

}
