import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {TextareaAutoresizeDirective} from './textarea-autoresize.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'textarea-widget',
  template: `<div [class]="options?.htmlClass || ''">
    @if (options?.title) {
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
      ></label>
    }
    @if (boundControl) {
      <textarea
        [textareaAutoresize]="true"
        spellcheck="true"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
      ></textarea>
    }
    @if (!boundControl) {
      <textarea
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [value]="controlValue"
        (input)="updateValue($event)"
        >{{ controlValue }}</textarea
      >
    }
  </div>`,
  imports: [FormsModule, TextareaAutoresizeDirective, ReactiveFormsModule],
})
export class TextareaComponent extends AbstractComponent implements OnInit {
  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
