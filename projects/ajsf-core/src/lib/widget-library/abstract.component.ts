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

  private _layoutNode: any;

  @Input()
  get layoutNode() {
    return this._layoutNode;
  }

  set layoutNode(layoutNode: any) {
    this.layoutNode = layoutNode;
    this.options = this.layoutNode.options || {};
  }

  @Input()
  layoutIndex: number[];
  @Input()
  dataIndex: number[];

  jsf = inject(JsonSchemaFormService);
}
