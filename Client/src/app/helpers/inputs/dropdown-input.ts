import { BaseInput, IBaseInput } from './base-input';

export class DropdownInput extends BaseInput {
    override controlType = 'dropdown';

    options: { key: number, value: string }[];
    filter?: boolean;
    filterBy?: string;
    showClear?: boolean;

    constructor(options: IDropdownInput) {
        super(options);
        this.options = options.options || [];
        this.showClear = options.showClear || false;
        this.filter = options.filter || false;
        this.filterBy = this.filterBy;
    }
}

export interface IDropdownInput extends IBaseInput {
    options?: { key: number, value: string }[];
    filter?: boolean;
    filterBy?: string;
    showClear?: boolean;
}