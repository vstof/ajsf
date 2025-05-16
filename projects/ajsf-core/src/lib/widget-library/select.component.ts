import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {buildTitleMap, isArray} from '../shared';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService, TitleMapItem} from '../json-schema-form.service';
import {AbstractComponent} from './abstract.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'select-widget',
  template: `@if (options?.title) {
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
      ></label>
    }
    @if (boundControl) {
      <select
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
      >
        @for (selectItem of selectList; track selectItem) {
          @if (!isArray(selectItem?.items)) {
            <option [value]="selectItem?.value">
              <span [innerHTML]="selectItem?.name"></span>
            </option>
          }
          @if (isArray(selectItem?.items)) {
            <optgroup [label]="selectItem?.group">
              @for (subItem of selectItem.items; track subItem) {
                <option [value]="subItem?.value">
                  <span [innerHTML]="subItem?.name"></span>
                </option>
              }
            </optgroup>
          }
        }
      </select>
    }
    @if (!boundControl) {
      <select
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        (change)="updateValue($event)"
      >
        @for (selectItem of selectList; track selectItem) {
          @if (!isArray(selectItem?.items)) {
            <option [selected]="selectItem?.value === controlValue" [value]="selectItem?.value">
              <span [innerHTML]="selectItem?.name"></span>
            </option>
          }
          @if (isArray(selectItem?.items)) {
            <optgroup [label]="selectItem?.group">
              @for (subItem of selectItem.items; track subItem) {
                <option [attr.selected]="subItem?.value === controlValue" [value]="subItem?.value">
                  <span [innerHTML]="subItem?.name"></span>
                </option>
              }
            </optgroup>
          }
        }
      </select>
    }`,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SelectComponent extends AbstractComponent implements OnInit {
  @HostBinding('class') public htmlClass = '';

  selectList: TitleMapItem[] = [];
  isArray = isArray;

  ngOnInit() {
    this.jsf.initializeControl(this);
    this.htmlClass = this.options.htmlClass || '';
    this.selectList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum,
      !!this.options.required,
      !!this.options.flatList,
    );
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
