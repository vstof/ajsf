import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-widget',
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
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [readonly]="options?.readonly ? 'readonly' : null"
        [type]="layoutNode?.type"
      />
    }
    @if (!boundControl) {
      <input
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (input)="updateValue($event)"
      />
    }
    @if (options?.typeahead?.source) {
      <datalist [id]="'control' + layoutNode?._id + 'Autocomplete'">
        @for (word of options?.typeahead?.source; track word) {
          <option [value]="word"></option>
        }
      </datalist>
    }
  `,
  imports: [FormsModule, ReactiveFormsModule],
})
export class InputComponent extends AbstractComponent implements OnInit {
  @HostBinding('class') public htmlClass = '';

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.htmlClass = this.options.htmlClass || '';
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
