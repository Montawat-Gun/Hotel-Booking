import { PrimeIcons } from "primeng/api";

export const DefualtLazyloadConfig: any = {
	first: 0,
	rows: 10,
}

export const ConfirmSaveConfig: any = {
	message: 'บันทึกรายการนี้',
	icon: PrimeIcons.EXCLAMATION_CIRCLE,
	acceptLabel: 'ตกลง',
	rejectLabel: 'ยกเลิก',
	acceptButtonStyleClass: 'p-button-sm p-button-success',
	rejectButtonStyleClass: 'p-button-sm p-button-secondary',
	dismissableMask: true,
}

export const ConfirmDeleteConfig: any = {
	message: 'ลบรายการนี้',
	icon: PrimeIcons.TRASH,
	acceptLabel: 'ตกลง',
	rejectLabel: 'ยกเลิก',
	acceptButtonStyleClass: 'p-button-sm p-button-danger',
	rejectButtonStyleClass: 'p-button-sm p-button-secondary',
	dismissableMask: true,
}