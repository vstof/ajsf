import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit, inject} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {CommonModule} from '@angular/common';

// TODO: Add this control

@Component({
  // tslint:disable-next-line:component-selector
  imports: [CommonModule],
  selector: 'file-widget',
  template: ``,
})
export class FileComponent implements OnInit {
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
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
