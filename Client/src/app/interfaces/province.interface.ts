export interface IProvince {
	id: number;
	name: string;
}

export interface IAmphure {
	id: number;
	name: string;
	provinceId: number;
}

export interface ITumbol {
	id: number;
	name: string;
	amphureId: number;
	zipcode: string;
}