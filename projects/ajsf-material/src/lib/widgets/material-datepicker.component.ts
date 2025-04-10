import {Component, Input, OnInit, inject} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {JsonSchemaFormService} from '@ajsf/core';
import {MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/legacy-form-field';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-datepicker-widget',
  template: ` <mat-form-field
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
        <input
          matInput
          [formControl]="formControl"
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [id]="'control' + layoutNode?._id"
          [max]="options?.maximum"
          [matDatepicker]="picker"
          [min]="options?.minimum"
          [name]="controlName"
          [placeholder]="options?.title"
          [readonly]="options?.readonly"
          [required]="options?.required"
          [style.width]="'100%'"
          (blur)="options.showErrors = true"
        />
      }
      @if (!boundControl) {
        <input
          matInput
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [disabled]="controlDisabled || options?.readonly"
          [id]="'control' + layoutNode?._id"
          [max]="options?.maximum"
          [matDatepicker]="picker"
          [min]="options?.minimum"
          [name]="controlName"
          [placeholder]="options?.title"
          [required]="options?.required"
          [style.width]="'100%'"
          [readonly]="options?.readonly"
          (blur)="options.showErrors = true"
        />
      }
      @if (options?.suffix || options?.fieldAddonRight) {
        <span matSuffix [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
      }
      @if (options?.description && (!options?.showErrors || !options?.errorMessage)) {
        <mat-hint align="end" [innerHTML]="options?.description"></mat-hint>
      }
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    </mat-form-field>
    <mat-datepicker #picker></mat-datepicker>
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
export class MaterialDatepickerComponent implements OnInit {
  matFormFieldDefaultOptions = inject(MAT_FORM_FIELD_DEFAULT_OPTIONS, {optional: true});
  private jsf = inject(JsonSchemaFormService);

  formControl: AbstractControl;
  controlName: string;
  dateValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  autoCompleteList: string[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this, !this.options.readonly);
    if (!this.options.notitle && !this.options.description && this.options.placeholder) {
      this.options.description = this.options.placeholder;
    }
  }
}
