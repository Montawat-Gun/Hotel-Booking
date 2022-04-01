import { BaseInput, IBaseInput } from "./base-input";

export class TextInput extends BaseInput {
    override controlType = 'textbox';

    type: string;
    autocomplete?: string;
    maxlength?: number;

    constructor(options: ITextInput) {
        super(options);
        this.autocomplete = options.autocomplete || 'off';
        this.maxlength = options.maxlength || Number.MAX_SAFE_INTEGER;
        this.type = options.type || 'text';
    }
}

export interface ITextInput extends IBaseInput {
    type?: string;
    autocomplete?: string;
    maxlength?: number;
}