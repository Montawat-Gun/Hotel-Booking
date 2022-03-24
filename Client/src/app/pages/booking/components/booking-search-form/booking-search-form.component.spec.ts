import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSearchFormComponent } from './booking-search-form.component';

describe('BookingSearchFormComponent', () => {
  let component: BookingSearchFormComponent;
  let fixture: ComponentFixture<BookingSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
