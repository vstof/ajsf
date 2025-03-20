import {AbstractControl} from '@angular/forms';
import {Component, Input, OnInit, inject} from '@angular/core';
import {JsonSchemaFormService} from '@ajsf/core';
import {CommonModule} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'extended-textarea-widget',
  template: `<div [class]="options?.htmlClass || ''">
      <textarea
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [attr.disabled]="controlDisabled || options?.readonly ? 'disabled' : null"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [value]="controlValue"
        (input)="updateValue($event)"
        >{{ controlValue }}</textarea
        >
        @if (showSelectPopup) {
          <span class="text-muted">
            <button (click)="selectPopup()" type="button" class="btn btn-link">select template</button> or enter #
          </span>
        }
      </div>`,
  imports: [CommonModule],
})
export class ExtendedTextareaComponent implements OnInit {
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
  showSelectPopup: boolean;

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.showSelectPopup = this.jsf.showSelectPopup;
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    if (this.showSelectPopup && event.target.value == '#') {
      this.jsf.selectPopup(
        {
          context: null,
          code: null,
          id: 0,
        },
        this,
      );
    } else {
      this.jsf.updateValue(this, event.target.value);
    }
  }

  selectPopup() {
    this.jsf.selectPopup(
      {
        context: null,
        code: null,
        id: 0,
      },
      this,
    );
  }
}
