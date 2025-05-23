import {AbstractControl} from '@angular/forms';
import {buildTitleMap} from '@ajsf/core';
import {Component, Input, OnInit, inject} from '@angular/core';
import {JsonSchemaFormService, TitleMapItem} from '@ajsf/core';

// TODO: Change this to use a Selection List instead?
// https://material.angular.io/components/list/overview

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-checkboxes-widget',
  template: ` <div>
    <mat-checkbox
      type="checkbox"
      [checked]="allChecked"
      [color]="options?.color || 'primary'"
      [disabled]="controlDisabled || options?.readonly"
      [indeterminate]="someChecked"
      [name]="options?.name"
      (blur)="options.showErrors = true"
      (change)="updateAllValues($event)"
    >
      <span class="checkbox-name" [innerHTML]="options?.name"></span>
    </mat-checkbox>
    @if (options?.title) {
      <label
        class="title"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
      ></label>
    }
    <ul class="checkbox-list" [class.horizontal-list]="horizontalList">
      @for (checkboxItem of checkboxList; track checkboxItem) {
        <li [class]="options?.htmlClass || ''">
          <mat-checkbox
            type="checkbox"
            [(ngModel)]="checkboxItem.checked"
            [color]="options?.color || 'primary'"
            [disabled]="controlDisabled || options?.readonly"
            [name]="checkboxItem?.name"
            (blur)="options.showErrors = true"
            (change)="updateValue()"
          >
            <span class="checkbox-name" [innerHTML]="checkboxItem?.name"></span>
          </mat-checkbox>
        </li>
      }
    </ul>
    @if (options?.showErrors && options?.errorMessage) {
      <mat-error [innerHTML]="options?.errorMessage"></mat-error>
    }
  </div>`,
  styles: [
    `
      .title {
        font-weight: bold;
      }
      .checkbox-list {
        list-style-type: none;
      }
      .horizontal-list > li {
        display: inline-block;
        margin-right: 10px;
        zoom: 1;
      }
      .checkbox-name {
        white-space: nowrap;
      }
      mat-error {
        font-size: 75%;
      }
    `,
  ],
})
export class MaterialCheckboxesComponent implements OnInit {
  private jsf = inject(JsonSchemaFormService);

  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  horizontalList = false;
  formArray: AbstractControl;
  checkboxList: TitleMapItem[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.horizontalList =
      this.layoutNode.type === 'checkboxes-inline' || this.layoutNode.type === 'checkboxbuttons';
    this.jsf.initializeControl(this);
    this.checkboxList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum,
      true,
    );
    if (this.boundControl) {
      const formArray = this.jsf.getFormControl(this);
      for (const checkboxItem of this.checkboxList) {
        checkboxItem.checked = formArray.value.includes(checkboxItem.value);
      }
    }
  }

  get allChecked(): boolean {
    return this.checkboxList.filter((t) => t.checked).length === this.checkboxList.length;
  }

  get someChecked(): boolean {
    const checkedItems = this.checkboxList.filter((t) => t.checked).length;
    return checkedItems > 0 && checkedItems < this.checkboxList.length;
  }

  updateValue() {
    this.options.showErrors = true;
    if (this.boundControl) {
      this.jsf.updateArrayCheckboxList(this, this.checkboxList);
    }
  }

  updateAllValues(event: any) {
    this.options.showErrors = true;
    this.checkboxList.forEach((t) => (t.checked = event.checked));
    this.updateValue();
  }
}
