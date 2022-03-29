import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './pages/booking/booking-list/booking-list.component';
import { HotelEditPageComponent } from './pages/hotel/hotel-edit-page/hotel-edit-page.component';
import { HotelListPageComponent } from './pages/hotel/hotel-list-page/hotel-list-page.component';
import { HotelResolver } from './pages/hotel/hotel.resolver';

const routes: Routes = [
  { path: '', component: HotelListPageComponent, pathMatch: 'full' },
  { path: 'add', component: HotelEditPageComponent },
  { path: 'edit/:id', component: HotelEditPageComponent },
  { path: 'booking/:id', component: BookingListComponent, resolve: { data: HotelResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }