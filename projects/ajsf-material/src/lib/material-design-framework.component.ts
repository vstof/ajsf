import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {isDefined, JsonSchemaFormService, SelectWidgetComponent} from '@ajsf/core';
import cloneDeep from 'lodash-es/cloneDeep';
import {NoFrameworkComponent} from '@ajsf/core/framework-library/no-framework.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'material-design-framework',
  imports: [SelectWidgetComponent],
  templateUrl: './material-design-framework.component.html',
  styleUrls: ['./material-design-framework.component.scss'],
})
export class MaterialDesignFrameworkComponent
  extends NoFrameworkComponent
  implements OnInit, OnChanges
{
  dynamicTitle: any;

  ngOnInit() {
    this.initializeFramework();
  }

  ngOnChanges() {
    if (!this.frameworkInitialized) {
      this.initializeFramework();
    }
    if (this.dynamicTitle) {
      this.updateTitle();
    }
  }

  initializeFramework() {
    if (this.layoutNode) {
      this.options = cloneDeep(this.layoutNode.options || {});
      this.widgetLayoutNode = {
        ...this.layoutNode,
        options: cloneDeep(this.layoutNode.options || {}),
      };
      this.widgetOptions = this.widgetLayoutNode.options;
      this.formControl = this.jsf.getFormControl(this);

      if (
        isDefined(this.widgetOptions.minimum) &&
        isDefined(this.widgetOptions.maximum) &&
        this.widgetOptions.multipleOf >= 1
      ) {
        this.layoutNode.type = 'range';
      }

      if (
        ![
          '$ref',
          'advancedfieldset',
          'authfieldset',
          'button',
          'card',
          'checkbox',
          'expansion-panel',
          'help',
          'message',
          'msg',
          'section',
          'submit',
          'tabarray',
          'tabs',
        ].includes(this.layoutNode.type) &&
        /{{.+?}}/.test(this.widgetOptions.title || '')
      ) {
        this.dynamicTitle = this.widgetOptions.title;
        this.updateTitle();
      }

      if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
        this.parentArray = this.jsf.getParentNode(this);
        if (this.parentArray) {
          this.isOrderable =
            this.parentArray.type.slice(0, 3) !== 'tab' &&
            this.layoutNode.arrayItemType === 'list' &&
            !this.widgetOptions.readonly &&
            this.parentArray.options.orderable;
        }
      }

      this.frameworkInitialized = true;
    } else {
      this.options = {};
    }
  }

  updateTitle() {
    this.widgetLayoutNode.options.title = this.jsf.parseText(
      this.dynamicTitle,
      this.jsf.getFormControlValue(this),
      this.jsf.getFormControlGroup(this).value,
      this.dataIndex[this.dataIndex.length - 1],
    );
  }

  removeItem() {
    this.jsf.removeItem(this);
  }
}
