import {ChangeDetectionStrategy, Component, Input, inject} from '@angular/core';
import {JsonSchemaFormService} from '@ajsf/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'flex-layout-root-widget',
  template: ` @for (layoutNode of layout; track layoutNode; let i = $index) {
    <div
      [class.form-flex-item]="isFlexItem"
      [style.flex-grow]="getFlexAttribute(layoutNode, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutNode, 'flex-shrink')"
      [style.flex-basis]="getFlexAttribute(layoutNode, 'flex-basis')"
      [style.align-self]="(layoutNode?.options || {})['align-self']"
      [style.order]="layoutNode?.options?.order"
    >
      @if (showWidget(layoutNode)) {
        <select-framework-widget
          [dataIndex]="layoutNode?.arrayItem ? (dataIndex || []).concat(i) : dataIndex || []"
          [layoutIndex]="(layoutIndex || []).concat(i)"
          [layoutNode]="layoutNode"
        ></select-framework-widget>
      }
      <div></div>
    </div>
  }`,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FlexLayoutRootComponent {
  private jsf = inject(JsonSchemaFormService);

  @Input() dataIndex: number[];
  @Input() layoutIndex: number[];
  @Input() layout: any[];
  @Input() isFlexItem = false;

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
