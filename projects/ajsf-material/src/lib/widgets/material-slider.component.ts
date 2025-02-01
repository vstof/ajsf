import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '@ajsf/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-slider-widget',
  template: `
    @if (boundControl) {
      <mat-slider thumbLabel
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [id]="'control' + layoutNode?._id"
        [max]="options?.maximum"
        [min]="options?.minimum"
        [step]="options?.multipleOf || options?.step || 'any'"
        [style.width]="'100%'"
      (blur)="options.showErrors = true"></mat-slider>
    }
    @if (!boundControl) {
      <mat-slider thumbLabel
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [disabled]="controlDisabled || options?.readonly"
        [id]="'control' + layoutNode?._id"
        [max]="options?.maximum"
        [min]="options?.minimum"
        [step]="options?.multipleOf || options?.step || 'any'"
        [style.width]="'100%'"
        [value]="controlValue"
        (blur)="options.showErrors = true"
      (change)="updateValue($event)"></mat-slider>
    }
    @if (options?.showErrors && options?.errorMessage) {
      <mat-error
      [innerHTML]="options?.errorMessage"></mat-error>
    }`,
  styles: [` mat-error { font-size: 75%; } `],
  standalone: false,
})
export class MaterialSliderComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  allowNegative = true;
  allowDecimal = true;
  allowExponents = false;
  lastValidNumber = '';
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this, !this.options.readonly);
  }

  updateValue(event) {
    this.options.showErrors = true;
    this.jsf.updateValue(this, event.value);
  }
}
