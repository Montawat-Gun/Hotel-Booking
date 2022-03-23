import { LazyLoadEvent } from "primeng/api";

export interface IHotel {
	id?: number;
	name?: string;
	provinceId?: number;
	amphureId?: number;
	tumbolId?: number;
}

export interface IHotelCriteria extends IHotel, LazyLoadEvent {
	// first: number;
	// rows: number;
	// sortField: string;
	// sortOrder: number;
}