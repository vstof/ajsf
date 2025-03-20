import {Component, Input, OnInit, inject} from '@angular/core';
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
  private jsf = inject(JsonSchemaFormService);

  options: any;
  message: string = null;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.message =
      this.options.help || this.options.helpvalue || this.options.msg || this.options.message;
  }
}
