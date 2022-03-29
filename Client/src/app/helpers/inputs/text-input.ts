import { BaseInput, IBaseInput } from "./base-input";

export class TextInput extends BaseInput {
    override controlType = 'textbox';

    autocomplete?: string;
    maxlength?: number;

    constructor(options: ITextInput) {
        super(options);
        this.autocomplete = options.autocomplete || 'off';
        this.maxlength = options.maxlength || Number.MAX_SAFE_INTEGER;
    }
}

export interface ITextInput extends IBaseInput {
    autocomplete?: string;
    maxlength?: number;
}