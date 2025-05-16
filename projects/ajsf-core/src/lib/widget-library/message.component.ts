import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'message-widget',
  template: `@if (message) {
    <span [class]="options?.labelHtmlClass || ''" [innerHTML]="message"></span>
  }`,
})
export class MessageComponent extends AbstractComponent implements OnInit {
  message: string = null;

  ngOnInit() {
    this.message =
      this.options.help || this.options.helpvalue || this.options.msg || this.options.message;
  }
}
