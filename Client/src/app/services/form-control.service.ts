import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseInput } from '../helpers/inputs/base-input';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(forms: BaseInput[]) {
    const group: any = {};

    forms.forEach(input => {
      group[input.key] = new FormControl({ value: input.value, disabled: input.disabled || false });
    });
    return new FormGroup(group);
  }
}
