import { LazyLoadEvent } from "primeng/api";
import { IHotel } from "../../hotel/interfaces/hotel.interface";
import { IStatus } from "./status.interface";

export interface IBooking {
	id?: number;
	firstName?: string;
	lastName?: string;
	checkIn?: Date;
	checkInDateDesc?: string;
	checkOut?: Date;
	checkOutDateDesc?: string;
	price?: number;
	hotelId?: number;
	hotel?: IHotel;
	statusId?: number;
	status?: IStatus;
	createDateDesc?: string;
	updateDateDesc?: string;
}


export interface IBookingCriteria extends IBooking, LazyLoadEvent {
	fromPrice?: number;
	toPrice?: number;
	checkInFrom?: string;
	checkInTo?: string;
	checkOutFrom?: string;
	checkOutTo?: string;
}