import {AbstractControl} from '@angular/forms';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {hasOwn} from '../shared/utility.functions';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {Subscription} from 'rxjs';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'submit-widget',
  template: `<div [class]="options?.htmlClass || ''">
    <input
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [attr.readonly]="options?.readonly ? 'readonly' : null"
      [attr.required]="options?.required"
      [class]="options?.fieldHtmlClass || ''"
      [disabled]="controlDisabled || options?.readonly"
      [id]="'control' + layoutNode?._id"
      [name]="controlName"
      [type]="layoutNode?.type"
      [value]="controlValue"
      (click)="updateValue($event)"
    />
  </div>`,
})
export class SubmitComponent extends AbstractComponent implements OnInit, OnDestroy {
  isValidChangesSubs: Subscription;

  ngOnInit() {
    this.jsf.initializeControl(this);
    if (hasOwn(this.options, 'disabled')) {
      this.controlDisabled = this.options.disabled;
    } else if (this.jsf.formOptions.disableInvalidSubmit) {
      this.controlDisabled = !this.jsf.isValid;
      this.isValidChangesSubs = this.isValidChangesSubs = this.jsf.isValidChanges.subscribe(
        (isValid) => (this.controlDisabled = !isValid),
      );
    }
    if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = this.options.title;
    }
  }
  ngOnDestroy(): void {
    this.isValidChangesSubs?.unsubscribe();
    this.isValidChangesSubs = null;
  }

  updateValue(event) {
    if (typeof this.options.onClick === 'function') {
      this.options.onClick(event);
    } else {
      this.jsf.updateValue(this, event.target.value);
    }
  }
}
