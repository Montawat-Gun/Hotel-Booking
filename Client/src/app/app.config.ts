import { PrimeIcons } from "primeng/api";
import { IColumnConfig } from "./components/dynamic-form/interfaces/column-config.interface";

export const DefualtLazyloadConfig = {
	first: 0,
	rows: 10,
}

export const DefualtColumnConfig: IColumnConfig = {
	columnSize: 12,
	columnSizeMd: 6,
	columnSizeLg: 6,
}

export const ConfirmSaveConfig = {
	message: 'บันทึกรายการนี้',
	icon: PrimeIcons.EXCLAMATION_CIRCLE,
	acceptLabel: 'ตกลง',
	rejectLabel: 'ยกเลิก',
	acceptButtonStyleClass: 'p-button-sm p-button-success',
	rejectButtonStyleClass: 'p-button-sm p-button-secondary',
	dismissableMask: true,
}

export const ConfirmDeleteConfig = {
	message: 'ลบรายการนี้',
	icon: PrimeIcons.TRASH,
	acceptLabel: 'ตกลง',
	rejectLabel: 'ยกเลิก',
	acceptButtonStyleClass: 'p-button-sm p-button-danger',
	rejectButtonStyleClass: 'p-button-sm p-button-secondary',
	dismissableMask: true,
}