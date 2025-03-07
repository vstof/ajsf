import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {CommonModule} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'message-widget',
  template: ` @if (message) {
    <span [class]="options?.labelHtmlClass || ''" [innerHTML]="message"></span>
  }`,
  imports: [CommonModule],
})
export class MessageComponent implements OnInit {
  options: any;
  message: string = null;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.message =
      this.options.help || this.options.helpvalue || this.options.msg || this.options.message;
  }
}
