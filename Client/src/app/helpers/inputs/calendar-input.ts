import * as moment from 'moment';
import { BaseInput, IBaseInput } from './base-input';

export class CalendarInput extends BaseInput {
    override controlType = 'calendar';
    readonlyInput?: boolean;
    inline?: boolean;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;

    constructor(options: ICalendarInput) {
        super(options);
        this.inline = options.inline || false;
        this.dateFormat = options.dateFormat || 'dd MM yy';
        this.minDate = options.minDate || new Date(1970);
        this.maxDate = options.maxDate || new Date(3000, 1, 1);
        this.readonlyInput = options.readonlyInput || false;
    }
}

export interface ICalendarInput extends IBaseInput {
    readonlyInput?: boolean;
    inline?: boolean;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
}