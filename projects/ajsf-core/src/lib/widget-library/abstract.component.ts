import {AbstractControl, UntypedFormControl} from '@angular/forms';
import {Component, inject, Input} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';

@Component({template: ''})
export class AbstractComponent extends UntypedFormControl {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;

  @Input()
  layoutNode: any;
  @Input()
  layoutIndex: number[];
  @Input()
  dataIndex: number[];

  jsf = inject(JsonSchemaFormService);
}
