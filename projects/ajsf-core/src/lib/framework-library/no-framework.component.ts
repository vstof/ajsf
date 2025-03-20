import {ChangeDetectorRef, Component, Input, inject} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractComponent} from '../widget-library/abstract.component';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'no-framework',
  templateUrl: './no-framework.component.html',
  imports: [NgComponentOutlet],
})
export class NoFrameworkComponent {
  changeDetector = inject(ChangeDetectorRef);
  jsf = inject(JsonSchemaFormService);

  frameworkInitialized = false;
  widgetOptions: any; // Options passed to child widget
  widgetLayoutNode: AbstractComponent; // layoutNode passed to child widget
  options: any; // Options used in this framework
  formControl: AbstractComponent;
  debugOutput: any = '';
  debug: any = '';
  parentArray: any = null;
  isOrderable = false;

  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  get showRemoveButton(): boolean {
    if (
      !this.layoutNode ||
      !this.widgetOptions.removable ||
      this.widgetOptions.readonly ||
      this.layoutNode.type === '$ref'
    ) {
      return false;
    }
    if (this.layoutNode.recursiveReference) {
      return true;
    }
    if (!this.layoutNode.arrayItem || !this.parentArray) {
      return false;
    }
    // If array length <= minItems, don't allow removing any items
    return this.parentArray.items.length - 1 <= this.parentArray.options.minItems
      ? false
      : // For removable list items, allow removing any item
        this.layoutNode.arrayItemType === 'list'
        ? true
        : // For removable tuple items, only allow removing last item in list
          this.layoutIndex[this.layoutIndex.length - 1] === this.parentArray.items.length - 2;
  }
}
