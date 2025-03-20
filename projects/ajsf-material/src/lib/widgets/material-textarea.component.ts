import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit, inject} from '@angular/core';
import {JsonSchemaFormService} from '@ajsf/core';
import {MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/legacy-form-field';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-textarea-widget',
  template: `<mat-form-field
      [appearance]="options?.appearance || matFormFieldDefaultOptions?.appearance || 'standard'"
      [class]="options?.htmlClass || ''"
      [floatLabel]="
        options?.floatLabel || matFormFieldDefaultOptions?.floatLabel || (options?.notitle ? 'never' : 'auto')
      "
      [hideRequiredMarker]="options?.hideRequired ? 'true' : 'false'"
      [style.width]="'100%'"
    >
      @if (!options?.notitle) {
        <mat-label>{{ options?.title }}</mat-label>
      }
      @if (options?.prefix || options?.fieldAddonLeft) {
        <span matPrefix [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
      }
      @if (boundControl) {
        <textarea
          matInput
          [formControl]="formControl"
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
          [attr.maxlength]="options?.maxLength"
          [attr.minlength]="options?.minLength"
          [attr.pattern]="options?.pattern"
          [required]="options?.required"
          [id]="'control' + layoutNode?._id"
          [name]="controlName"
          [placeholder]="options?.notitle ? options?.placeholder : options?.title"
          [readonly]="options?.readonly ? 'readonly' : null"
          [style.width]="'100%'"
          (blur)="options.showErrors = true"
        ></textarea>
      }
      @if (!boundControl) {
        <textarea
          matInput
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
          [attr.maxlength]="options?.maxLength"
          [attr.minlength]="options?.minLength"
          [attr.pattern]="options?.pattern"
          [required]="options?.required"
          [disabled]="controlDisabled || options?.readonly"
          [id]="'control' + layoutNode?._id"
          [name]="controlName"
          [placeholder]="options?.notitle ? options?.placeholder : options?.title"
          [readonly]="options?.readonly ? 'readonly' : null"
          [style.width]="'100%'"
          [value]="controlValue"
          (input)="updateValue($event)"
          (blur)="options.showErrors = true"
        ></textarea>
      }
      @if (options?.suffix || options?.fieldAddonRight) {
        <span matSuffix [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
      }
      @if (options?.description && (!options?.showErrors || !options?.errorMessage)) {
        <mat-hint align="end" [innerHTML]="options?.description"></mat-hint>
      }
    </mat-form-field>
    @if (options?.showErrors && options?.errorMessage) {
      <mat-error [innerHTML]="options?.errorMessage"></mat-error>
    }`,
  styles: [
    `
      mat-error {
        font-size: 75%;
        margin-top: -1rem;
        margin-bottom: 0.5rem;
      }
      ::ng-deep json-schema-form mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix {
        width: initial;
      }
    `,
  ],
})
export class MaterialTextareaComponent implements OnInit {
  matFormFieldDefaultOptions = inject(MAT_FORM_FIELD_DEFAULT_OPTIONS, {optional: true});
  private jsf = inject(JsonSchemaFormService);

  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    if (!this.options.notitle && !this.options.description && this.options.placeholder) {
      this.options.description = this.options.placeholder;
    }
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
