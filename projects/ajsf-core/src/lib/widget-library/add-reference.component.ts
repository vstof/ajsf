import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {CommonModule} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-reference-widget',
  imports: [CommonModule],
  template: ` @if (showAddButton) {
    <button [class]="options?.fieldHtmlClass || ''" [disabled]="options?.readonly" (click)="addItem($event)">
      @if (options?.icon) {
        <span [class]="options?.icon"></span>
      }
      @if (options?.title) {
        <span [innerHTML]="buttonText"></span>
      }
    </button>
  }`,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddReferenceComponent implements OnInit {
  private jsf = inject(JsonSchemaFormService);

  options: any;
  itemCount: number;
  previousLayoutIndex: number[];
  previousDataIndex: number[];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
  }

  get showAddButton(): boolean {
    return (
      !this.layoutNode.arrayItem ||
      this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems
    );
  }

  addItem(event) {
    event.preventDefault();
    this.jsf.addItem(this);
  }

  get buttonText(): string {
    const parent: any = {
      dataIndex: this.dataIndex.slice(0, -1),
      layoutIndex: this.layoutIndex.slice(0, -1),
      layoutNode: this.jsf.getParentNode(this),
    };
    return (
      parent.layoutNode.add || this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount)
    );
  }
}
