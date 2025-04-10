import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'checkbox-widget',
  template: `<label [attr.for]="'control' + layoutNode?._id" [class]="options?.itemLabelHtmlClass || ''">
    @if (boundControl) {
      <input
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [class]="
          (options?.fieldHtmlClass || '') +
          (isChecked
            ? ' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')
            : ' ' + (options?.style?.unselected || ''))
        "
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        type="checkbox"
      />
    }
    @if (!boundControl) {
      <input
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [checked]="isChecked ? 'checked' : null"
        [class]="
          (options?.fieldHtmlClass || '') +
          (isChecked
            ? ' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')
            : ' ' + (options?.style?.unselected || ''))
        "
        [disabled]="controlDisabled || options?.readonly"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [value]="controlValue"
        type="checkbox"
        (change)="updateValue($event)"
      />
    }
    @if (options?.title) {
      <span [style.display]="options?.notitle ? 'none' : ''" [innerHTML]="options?.title"></span>
    }
  </label>`,
  imports: [FormsModule, ReactiveFormsModule],
})
export class CheckboxComponent extends AbstractComponent implements OnInit {
  trueValue: any = true;
  falseValue: any = false;
  ngOnInit() {
    this.jsf.initializeControl(this);
    if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = this.options.title;
    }
  }

  updateValue(event) {
    event.preventDefault();
    this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
  }

  get isChecked() {
    return this.jsf.getFormControlValue(this) === this.trueValue;
  }
}
