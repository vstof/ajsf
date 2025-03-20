import { Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';

import {JsonSchemaFormService} from '../json-schema-form.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'select-framework-widget',
  template: `<div #widgetContainer></div>`,
})
export class SelectFrameworkComponent implements OnChanges, OnInit {
  private componentFactory = inject(ComponentFactoryResolver);
  private jsf = inject(JsonSchemaFormService);

  newComponent: ComponentRef<any> = null;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  @ViewChild('widgetContainer', {
    read: ViewContainerRef,
    static: true,
  })
  widgetContainer: ViewContainerRef;

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  updateComponent() {
    if (this.widgetContainer && !this.newComponent && this.jsf.framework) {
      this.newComponent = this.widgetContainer.createComponent(
        this.componentFactory.resolveComponentFactory(this.jsf.framework),
      );
    }
    if (this.newComponent) {
      for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
        this.newComponent.instance[input] = this[input];
      }
    }
  }
}
