import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss']
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: any;
  @Input() form!: FormGroup;
  @Input() isSubmited: boolean = false;

  get getValue() { return this.form.controls[this.input.key].value }
  get hasError() { return this.form.controls[this.input.key].errors; }

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    if (this.input.onChange)
      this.input.onChange(e);
  }
}
