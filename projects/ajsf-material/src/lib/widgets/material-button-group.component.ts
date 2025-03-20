import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit, inject} from '@angular/core';
import {JsonSchemaFormService, buildTitleMap} from '@ajsf/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-button-group-widget',
  template: ` <div>
    @if (options?.title) {
      <div>
        <label
          [attr.for]="'control' + layoutNode?._id"
          [class]="options?.labelHtmlClass || ''"
          [style.display]="options?.notitle ? 'none' : ''"
          [innerHTML]="options?.title"
        ></label>
      </div>
    }
    <mat-button-toggle-group
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [attr.readonly]="options?.readonly ? 'readonly' : null"
      [attr.required]="options?.required"
      [disabled]="controlDisabled || options?.readonly"
      [name]="controlName"
      [value]="controlValue"
      [vertical]="!!options.vertical"
    >
      @for (radioItem of radiosList; track radioItem) {
        <mat-button-toggle
          [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
          [value]="radioItem?.value"
          (click)="updateValue(radioItem?.value)"
        >
          <span [innerHTML]="radioItem?.name"></span>
        </mat-button-toggle>
      }
    </mat-button-toggle-group>
    @if (options?.showErrors && options?.errorMessage) {
      <mat-error [innerHTML]="options?.errorMessage"></mat-error>
    }
  </div>`,
  styles: [
    `
      mat-error {
        font-size: 75%;
      }
    `,
  ],
})
export class MaterialButtonGroupComponent implements OnInit {
  private jsf = inject(JsonSchemaFormService);

  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  radiosList: any[] = [];
  vertical = false;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.radiosList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum,
      true,
    );
    this.jsf.initializeControl(this);
  }

  updateValue(value) {
    this.options.showErrors = true;
    this.jsf.updateValue(this, value);
  }
}
