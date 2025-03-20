import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Component, Input, OnInit, inject } from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {CommonModule} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hidden-widget',
  template: `@if (boundControl) {
      <input [formControl]="formControl" [id]="'control' + layoutNode?._id" [name]="controlName" type="hidden" />
    }
    @if (!boundControl) {
      <input
        [disabled]="controlDisabled"
        [name]="controlName"
        [id]="'control' + layoutNode?._id"
        type="hidden"
        [value]="controlValue"
      />
    }`,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class HiddenComponent implements OnInit {
  private jsf = inject(JsonSchemaFormService);

  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.jsf.initializeControl(this);
  }
}
