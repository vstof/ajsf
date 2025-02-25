import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {SelectFrameworkComponent} from './select-framework.component';
import {CommonModule} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tabs-widget',
  template: ` <ul [class]="options?.labelHtmlClass || ''">
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
          <select-framework-widget
            [class]="
              (options?.fieldHtmlClass || '') +
              ' ' +
              (options?.activeClass || '') +
              ' ' +
              (options?.style?.selected || '')
            "
            [dataIndex]="layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex"
            [layoutIndex]="(layoutIndex || []).concat(i)"
            [layoutNode]="layoutItem"
          ></select-framework-widget>
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
  imports: [CommonModule, SelectFrameworkComponent],
})
export class TabsComponent implements OnInit {
  options: any;
  itemCount: number;
  selectedItem = 0;
  showAddTab = true;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.itemCount = this.layoutNode.items.length - 1;
    this.updateControl();
  }

  select(index) {
    if (this.layoutNode.items[index].type === '$ref') {
      this.itemCount = this.layoutNode.items.length;
      this.jsf.addItem({
        layoutNode: this.layoutNode.items[index],
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
