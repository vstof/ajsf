import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button-widget',
  template: `<div [class]="options?.htmlClass || ''">
    <button
      [attr.readonly]="options?.readonly ? 'readonly' : null"
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [class]="options?.fieldHtmlClass || ''"
      [disabled]="controlDisabled || options?.readonly"
      [name]="controlName"
      [type]="layoutNode?.type"
      [value]="controlValue"
      (click)="updateValue($event)"
    >
      @if (options?.icon || options?.title) {
        <span [class]="options?.icon" [innerHTML]="options?.title"></span>
      }
    </button>
  </div>`,
})
export class ButtonComponent extends AbstractComponent implements OnInit {
  ngOnInit() {
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    if (typeof this.options.onClick === 'function') {
      this.options.onClick(event);
    } else {
      this.jsf.updateValue(this, event.target.value);
    }
  }
}
