import {AbstractControl} from '@angular/forms';
import {buildTitleMap} from '../shared';
import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService, TitleMapItem} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'checkboxes-widget',
  template: `
    @if (options?.title) {
      <label
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
      ></label>
    }
    @for (checkboxItem of checkboxList; track checkboxItem) {
      <div [class]="options?.htmlClass || ''">
        <input
          type="checkbox"
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [readonly]="options?.readonly ? 'readonly' : null"
          [attr.required]="options?.required"
          [checked]="checkboxItem.checked"
          [class]="options?.fieldHtmlClass || ''"
          [disabled]="controlDisabled || options?.readonly"
          [id]="'control' + layoutNode?._id + '/' + checkboxItem.value"
          [name]="checkboxItem?.name"
          [value]="checkboxItem.value"
          (change)="updateValue($event)"
        />
        <label
          [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
          [class]="options?.itemLabelHtmlClass || ''"
          [innerHTML]="checkboxItem.name"
        >
        </label>
      </div>
    }
  `,
})
export class CheckboxesComponent extends AbstractComponent implements OnInit {
  layoutOrientation: string;
  formArray: AbstractControl;
  checkboxList: TitleMapItem[] = [];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    const layoutNode = this.layoutNode;
    this.layoutOrientation =
      layoutNode.type === 'checkboxes-inline' || layoutNode.type === 'checkboxbuttons'
        ? 'horizontal'
        : 'vertical';
    this.jsf.initializeControl(this);
    this.checkboxList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum,
      true,
    );
    if (this.boundControl) {
      const formArray = this.jsf.getFormControl(this);
      this.checkboxList.forEach(
        (checkboxItem) => (checkboxItem.checked = formArray.value.includes(checkboxItem.value)),
      );
    }
  }

  updateValue(event) {
    for (const checkboxItem of this.checkboxList) {
      if (event.target.value === checkboxItem.value) {
        checkboxItem.checked = event.target.checked;
      }
    }
    if (this.boundControl) {
      this.jsf.updateArrayCheckboxList(this, this.checkboxList);
    }
  }
}
