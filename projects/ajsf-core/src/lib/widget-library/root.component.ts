import {Component, inject, Input, input} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {OrderableDirective} from './orderable.directive';
import {NgComponentOutlet} from '@angular/common';
import {Framework} from '@ajsf/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'root-widget',
  template: `@for (layoutItem of layout; track layoutItem; let i = $index) {
    <div
      [class.form-flex-item]="isFlexItem"
      [style.align-self]="(layoutItem.options || {})['align-self']"
      [style.flex-basis]="getFlexAttribute(layoutItem, 'flex-basis')"
      [style.flex-grow]="getFlexAttribute(layoutItem, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutItem, 'flex-shrink')"
      [style.order]="(layoutItem.options || {}).order"
    >
      <div
        [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : dataIndex || []"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"
        [orderable]="isDraggable(layoutItem)"
      >
        @if (showWidget(layoutItem)) {
          <ng-container         
            [ngComponentOutlet]="framework.frameworkComponent"
            [ngComponentOutletInputs]="{
                layoutNode: layoutItem, 
                layoutIndex: (layoutIndex || []).concat(i), 
                dataIndex: layoutItem?.arrayItem ? (dataIndex || []).concat(i) : dataIndex || []
              }"
            />   
        }
      </div>
    </div>
  }`,
  styles: [
    `
      [draggable="true"] {
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      [draggable="true"]:hover {
        cursor: move;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 10;
        margin-top: -1px;
        margin-left: -1px;
        margin-right: 1px;
        margin-bottom: 1px;
      }
      [draggable="true"].drag-target-top {
        box-shadow: 0 -2px 0 #000;
        position: relative;
        z-index: 20;
      }
      [draggable="true"].drag-target-bottom {
        box-shadow: 0 2px 0 #000;
        position: relative;
        z-index: 20;
      }
    `,
  ],
  imports: [OrderableDirective, NgComponentOutlet],
})
export class RootComponent {
  private jsf = inject(JsonSchemaFormService);
  framework = inject(Framework);
  options: any;

  @Input()
  layoutIndex: number[];
  @Input()
  dataIndex: number[];
  @Input()
  layout: any[];
  @Input()
  isOrderable: boolean;
  @Input()
  isFlexItem: boolean;

  isDraggable(node: any): boolean {
    return (
      node.arrayItem &&
      node.type !== '$ref' &&
      node.arrayItemType === 'list' &&
      this.isOrderable !== false
    );
  }

  // Set attributes for flexbox child
  // (container attributes are set in section.component)
  getFlexAttribute(node: any, attribute: string) {
    const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
    return (
      ((node.options || {}).flex || '').split(/\s+/)[index] ||
      (node.options || {})[attribute] ||
      ['1', '1', 'auto'][index]
    );
  }

  showWidget(layoutNode: any): boolean {
    return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
  }
}
