import {Component, Input, OnInit} from '@angular/core';
import {JsonSchemaFormService} from '../json-schema-form.service';
import {AbstractControl} from '@angular/forms';
import {AbstractComponent} from './abstract.component';
import {RootComponent} from './root.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tab-widget',
  template: ` <div [class]="options?.htmlClass || ''">
    <root-widget [dataIndex]="dataIndex" [layoutIndex]="layoutIndex" [layout]="layoutNode.items"></root-widget>
  </div>`,
  imports: [RootComponent],
})
export class TabComponent extends AbstractComponent implements OnInit {
  ngOnInit() {}
}
