import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DefualtColumnConfig } from 'src/app/app.config';
import { BaseInput } from 'src/app/helpers/inputs/base-input';
import { FormControlService } from 'src/app/services/form-control.service';
import { IDynamicForm } from './interfaces/dynamic-form.interface';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() option: IDynamicForm = {
    inputs: [],
    submitButtonText: "",
    showCancelButton: false,
  }

  @Input() loading: boolean = false;

  @Output() submitEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();

  submited: boolean = false;
  form!: FormGroup;

  get getData() { return this.form.getRawValue() }
  setData(value: any) {
    this.form.patchValue(value);
  }

  setOptions(key: string, values: { key: any, value: any }[]) {
    let input = this.option.inputs.find(x => x.key === key)!;
    if ('options' in input) {
      (input as any).options = values;
    }
  }

  setEnable(key: string) {
    this.form.controls[key].enable();
  }

  setDisable(key: string) {
    this.form.controls[key].disable();
  }

  constructor(private formControlService: FormControlService) { }

  ngOnInit() {
    if (!this.option.columnConfig) {
      this.option.columnConfig = DefualtColumnConfig;
    }
    if (this.option.showSubmitButton === null || this.option.showSubmitButton == undefined) {
      this.option.showSubmitButton = true;
    }
    this.form = this.formControlService.toFormGroup(this.option.inputs as BaseInput[]);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.submited = true;
      return;
    }
    this.submitEvent.emit(this.form.getRawValue());
  }

  onCancel() {
    this.cancelEvent.emit(null);
  }

}
