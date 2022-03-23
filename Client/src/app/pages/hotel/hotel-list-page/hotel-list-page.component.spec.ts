import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListPageComponent } from './hotel-list-page.component';

describe('HotelListPageComponent', () => {
  let component: HotelListPageComponent;
  let fixture: ComponentFixture<HotelListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
