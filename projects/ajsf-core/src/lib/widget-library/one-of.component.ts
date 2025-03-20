import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

// TODO: Add this control

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'one-of-widget',
  template: ``,
})
export class OneOfComponent extends AbstractComponent implements OnInit {
  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
