import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditFormComponent } from './hotel-edit-form.component';

describe('HotelEditFormComponent', () => {
  let component: HotelEditFormComponent;
  let fixture: ComponentFixture<HotelEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
