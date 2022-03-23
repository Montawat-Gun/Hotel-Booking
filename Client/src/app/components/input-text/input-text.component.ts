import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() name: any;
  @Input() isSubmited: boolean = false;
  @Input() validator: any;

  constructor() { }

  ngOnInit(): void {
  }

}
