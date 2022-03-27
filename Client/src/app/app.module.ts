import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BaseUrlInterceptor } from './helpers/base-url.interceptor';
import { ShareModule } from './share.module';
import { HotelListPageComponent } from './pages/hotel/hotel-list-page/hotel-list-page.component';
import { HotelEditPageComponent } from './pages/hotel/hotel-edit-page/hotel-edit-page.component';
import { HotelSearchFormComponent } from './pages/hotel/component/hotel-search-form/hotel-search-form.component';
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService } from 'primeng/api';
import { HotelEditFormComponent } from './pages/hotel/component/hotel-edit-form/hotel-edit-form.component';
import { BookingListComponent } from './pages/booking/booking-list/booking-list.component';
import { BookingEditComponent } from './pages/booking/booking-edit/booking-edit.component';
import { BookingSearchFormComponent } from './pages/booking/components/booking-search-form/booking-search-form.component';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HotelListPageComponent,
    HotelEditPageComponent,
    HotelSearchFormComponent,
    HotelEditFormComponent,
    BookingListComponent,
    BookingEditComponent,
    BookingSearchFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    AppRoutingModule
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
