import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelEditPageComponent } from './pages/hotel/hotel-edit-page/hotel-edit-page.component';
import { HotelListPageComponent } from './pages/hotel/hotel-list-page/hotel-list-page.component';
import { HotelResolver } from './pages/hotel/hotel.resolver';

const routes: Routes = [
  { path: '', component: HotelListPageComponent, pathMatch: 'full' },
  { path: 'add', component: HotelEditPageComponent, },
  { path: 'edit/:id', component: HotelEditPageComponent, resolve: { hotel: HotelResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }