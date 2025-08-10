import {ChangeDetectionStrategy, Component, Input, inject} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {JsonSchemaFormService, Framework} from '@ajsf/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'flex-layout-root-widget',
  templateUrl: './flex-layout-root.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [NgComponentOutlet],
})
export class FlexLayoutRootComponent {
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

  removeItem(item) {
    this.jsf.removeItem(item);
  }

  // Set attributes for flexbox child
  // (container attributes are set in flex-layout-section.component)
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
