import {Component, inject, OnInit} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {NgComponentOutlet} from '@angular/common';
import {Framework} from '@ajsf/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tabs-widget',
  template: `<ul [class]="options?.labelHtmlClass || ''">
      @for (item of layoutNode?.items; track item; let i = $index) {
        <li
          [class]="
            (options?.itemLabelHtmlClass || '') +
            (selectedItem === i
              ? ' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')
              : ' ' + options?.style?.unselected)
          "
          role="presentation"
          data-tabs
        >
          @if (showAddTab || item.type !== "$ref") {
            <a
              [class]="
                'nav-link' +
                (selectedItem === i
                  ? ' ' + options?.activeClass + ' ' + options?.style?.selected
                  : ' ' + options?.style?.unselected)
              "
              [innerHTML]="setTabTitle(item, i)"
              (click)="select(i)"
            ></a>
          }
        </li>
      }
    </ul>

    @for (layoutItem of layoutNode?.items; track layoutItem; let i = $index) {
      <div [class]="options?.htmlClass || ''">
        @if (selectedItem === i) {
          <div  [class]="
              (options?.fieldHtmlClass || '') +
              ' ' +
              (options?.activeClass || '') +
              ' ' +
              (options?.style?.selected || '')
            ">
          <ng-container         
            [ngComponentOutlet]="framework.frameworkComponent"
            [ngComponentOutletInputs]="{
                  layoutNode: layoutItem, 
                  layoutIndex: (layoutIndex || []).concat(i), 
                  dataIndex: layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex
                }"
          />
        </div>
        }
      </div>
    }`,
  styles: [
    `
      a {
        cursor: pointer;
      }
    `,
  ],
  imports: [NgComponentOutlet],
})
export class TabsComponent extends AbstractComponent implements OnInit {
  framework = inject(Framework);

  itemCount: number;
  selectedItem = 0;
  showAddTab = true;

  ngOnInit() {
    this.itemCount = this.layoutNode.items.length - 1;
    this.updateControl();
  }

  select(index) {
    const layoutNode = this.layoutNode;
    if (layoutNode.items[index].type === '$ref') {
      this.itemCount = layoutNode.items.length;
      this.jsf.addItem({
        layoutNode: layoutNode.items[index],
        layoutIndex: this.layoutIndex.concat(index),
        dataIndex: this.dataIndex.concat(index),
      });
      this.updateControl();
    }
    this.selectedItem = index;
  }

  updateControl() {
    const lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
    if (lastItem.type === '$ref' && this.itemCount >= (lastItem.options.maxItems || 1000)) {
      this.showAddTab = false;
    }
  }

  setTabTitle(item: any, index: number): string {
    return this.jsf.setArrayItemTitle(this, item, index);
  }
}
