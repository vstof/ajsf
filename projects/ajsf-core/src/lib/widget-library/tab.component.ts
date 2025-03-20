import {Component, Input, OnInit, inject} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {RootComponent} from './root.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tab-widget',
  template: ` <div [class]="options?.htmlClass || ''">
    <root-widget [dataIndex]="dataIndex" [layoutIndex]="layoutIndex" [layout]="layoutNode.items"></root-widget>
  </div>`,
  imports: [RootComponent],
})
export class TabComponent implements OnInit {
  private jsf = inject(JsonSchemaFormService);

  options: any;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options || {};
  }
}
