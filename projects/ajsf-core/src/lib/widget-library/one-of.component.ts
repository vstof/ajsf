import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from './abstract.component';

// TODO: Add this control

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'one-of-widget',
  template: ``,
})
export class OneOfComponent extends AbstractComponent implements OnInit {
  ngOnInit() {
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
