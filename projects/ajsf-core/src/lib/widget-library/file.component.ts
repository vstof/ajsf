import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

// TODO: Add this control

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'file-widget',
  template: ``,
})
export class FileComponent extends AbstractComponent implements OnInit {
  ngOnInit() {
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
