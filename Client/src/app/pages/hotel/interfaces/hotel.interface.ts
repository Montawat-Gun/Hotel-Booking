import { LazyLoadEvent } from "primeng/api";

export interface IHotel {
	id?: number;
	name?: string;
	provinceId?: number;
	amphureId?: number;
	tumbolId?: number;
	createDateDesc?:string;
	updateDateDesc?:string;
}

export interface IHotelCriteria extends IHotel, LazyLoadEvent {
}