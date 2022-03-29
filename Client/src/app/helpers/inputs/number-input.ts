import { BaseInput, IBaseInput } from "./base-input";

export class NumberInput extends BaseInput {
    override controlType = 'number';
    autocomplete?: string;
    maxlength?: number;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;

    constructor(options: INumberInput) {
        super(options);
        this.autocomplete = options.autocomplete || 'off';
        this.prefix = options.prefix;
        this.suffix = options.suffix;
        this.min = options.min;
        this.max = options.max;
        this.maxlength = options.maxlength || Number.MAX_SAFE_INTEGER;
    }
}

export interface INumberInput extends IBaseInput {
    autocomplete?: string;
    maxlength?: number;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
}