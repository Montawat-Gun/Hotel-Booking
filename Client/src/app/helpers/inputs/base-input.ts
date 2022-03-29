export class BaseInput {
    protected controlType!: string;
    key: string;
    value: any;
    label: string;
    required: boolean;
    order: number;
    type: string;
    placeholder: string;
    errorText?: string;
    disabled?: boolean;
    styleClass?: string;
    onChange?: (e: any) => void;

    constructor(options: IBaseInput) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.type = options.type || '';
        this.placeholder = options.placeholder || '';
        this.errorText = options.errorText;
        this.onChange = options.onChange;
        this.disabled = options.disabled;
        this.styleClass = options.styleClass || ''
    }
}

export interface IBaseInput {
    key: string;
    value?: any;
    label?: string;
    required?: boolean;
    order?: number;
    type?: string;
    placeholder?: string;
    errorText?: string;
    disabled?: boolean;
    styleClass?: string;
    onChange?: (e: any) => void;
}