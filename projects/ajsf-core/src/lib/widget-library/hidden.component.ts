import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

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
  imports: [FormsModule, ReactiveFormsModule],
})
export class HiddenComponent extends AbstractComponent implements OnInit {
  ngOnInit() {
    this.jsf.initializeControl(this);
  }
}
