import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditPageComponent } from './hotel-edit-page.component';

describe('HotelEditPageComponent', () => {
  let component: HotelEditPageComponent;
  let fixture: ComponentFixture<HotelEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
