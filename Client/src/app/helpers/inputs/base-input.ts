import { ValidatorFn } from "@angular/forms";

export class BaseInput {
    protected controlType!: string;
    key: string;
    value: any;
    label: string;
    order: number;
    placeholder: string;
    validators: { name: string, validator: ValidatorFn, message: string }[];
    disabled?: boolean;
    styleClass?: string;
    onChange?: (e: any) => void;

    constructor(options: IBaseInput) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.placeholder = options.placeholder || '';
        this.validators = options.validators || [];
        this.onChange = options.onChange;
        this.disabled = options.disabled;
        this.styleClass = options.styleClass || ''
    }
}

export interface IBaseInput {
    key: string;
    value?: any;
    label?: string;
    order?: number;
    placeholder?: string;
    validators?: { name: string, validator: ValidatorFn, message: string }[];
    disabled?: boolean;
    styleClass?: string;
    onChange?: (e: any) => void;
}