import { BaseInput } from "src/app/helpers/inputs/base-input";
import { IColumnConfig } from "./column-config.interface";

export interface IDynamicForm {
    inputs: BaseInput[];
    columnConfig?: IColumnConfig;
    showSubmitButton?: boolean;
    submitButtonText?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
} 