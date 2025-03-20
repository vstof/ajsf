import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'number-widget',
  template: `
    @if (options?.title) {
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
      ></label>
    }
    @if (boundControl) {
      <input
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.max]="options?.maximum"
        [attr.min]="options?.minimum"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.step]="options?.multipleOf || options?.step || 'any'"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [title]="lastValidNumber"
        [type]="layoutNode?.type === 'range' ? 'range' : 'number'"
      />
    }
    @if (!boundControl) {
      <input
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.max]="options?.maximum"
        [attr.min]="options?.minimum"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.step]="options?.multipleOf || options?.step || 'any'"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled || options?.readonly"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [title]="lastValidNumber"
        [type]="layoutNode?.type === 'range' ? 'range' : 'number'"
        [value]="controlValue"
        (input)="updateValue($event)"
      />
    }
    @if (layoutNode?.type === "range") {
      <span [innerHTML]="controlValue"></span>
    }`,
  imports: [FormsModule, ReactiveFormsModule],
})
export class NumberComponent extends AbstractComponent implements OnInit {
  @HostBinding('class') public htmlClass = '';

  allowDecimal = true;
  lastValidNumber = '';
  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.htmlClass = this.options.htmlClass || '';
    this.jsf.initializeControl(this);
    if (this.layoutNode.dataType === 'integer') {
      this.allowDecimal = false;
    }
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
