import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-hotel-edit-page',
  templateUrl: './hotel-edit-page.component.html',
  styleUrls: ['./hotel-edit-page.component.scss']
})
export class HotelEditPageComponent implements OnInit {

  id!: number;
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { icon: 'pi pi-home', routerLink: '/' },
      { label: 'Hotel', routerLink: '/' },
      { label: this.id ? 'Edit' : 'Add' },
    ];

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
  }





}
