import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {RootComponent} from './root.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'section-widget',
  template: `@if (containerType === "div") {
      <div
        [class]="options?.htmlClass || ''"
        [class.expandable]="options?.expandable && !expanded"
        [class.expanded]="options?.expandable && expanded"
      >
        @if (sectionTitle) {
          <label
            class="legend"
            [class]="options?.labelHtmlClass || ''"
            [innerHTML]="sectionTitle"
            (click)="toggleExpanded()"
          ></label>
        }
        @if (expanded) {
          <root-widget
            [dataIndex]="dataIndex"
            [layout]="layoutNode.items"
            [layoutIndex]="layoutIndex"
            [isFlexItem]="getFlexAttribute('is-flex')"
            [isOrderable]="options?.orderable"
            [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
            [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
            [style.align-content]="getFlexAttribute('align-content')"
            [style.align-items]="getFlexAttribute('align-items')"
            [style.display]="getFlexAttribute('display')"
            [style.flex-direction]="getFlexAttribute('flex-direction')"
            [style.flex-wrap]="getFlexAttribute('flex-wrap')"
            [style.justify-content]="getFlexAttribute('justify-content')"
          ></root-widget>
        }
      </div>
    }
    @if (containerType === "fieldset") {
      <fieldset
        [class]="options?.htmlClass || ''"
        [class.expandable]="options?.expandable && !expanded"
        [class.expanded]="options?.expandable && expanded"
        [disabled]="options?.readonly"
      >
        @if (sectionTitle) {
          <legend
            class="legend"
            [class]="options?.labelHtmlClass || ''"
            [innerHTML]="sectionTitle"
            (click)="toggleExpanded()"
          ></legend>
        }
        @if (options?.messageLocation !== "bottom") {
          <div>
            @if (options?.description) {
              <p class="help-block" [class]="options?.labelHelpBlockClass || ''" [innerHTML]="options?.description"></p>
            }
          </div>
        }
        @if (expanded) {
          <root-widget
            [dataIndex]="dataIndex"
            [layout]="layoutNode.items"
            [layoutIndex]="layoutIndex"
            [isFlexItem]="getFlexAttribute('is-flex')"
            [isOrderable]="options?.orderable"
            [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
            [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
            [style.align-content]="getFlexAttribute('align-content')"
            [style.align-items]="getFlexAttribute('align-items')"
            [style.display]="getFlexAttribute('display')"
            [style.flex-direction]="getFlexAttribute('flex-direction')"
            [style.flex-wrap]="getFlexAttribute('flex-wrap')"
            [style.justify-content]="getFlexAttribute('justify-content')"
          ></root-widget>
        }
        @if (options?.messageLocation === "bottom") {
          <div>
            @if (options?.description) {
              <p class="help-block" [class]="options?.labelHelpBlockClass || ''" [innerHTML]="options?.description"></p>
            }
          </div>
        }
      </fieldset>
    }`,
  styles: [
    `
      .legend {
        font-weight: bold;
      }
      .expandable > legend:before,
      .expandable > label:before {
        content: "▶";
        padding-right: 0.3em;
      }
      .expanded > legend:before,
      .expanded > label:before {
        content: "▼";
        padding-right: 0.2em;
      }
    `,
  ],
  imports: [RootComponent],
})
export class SectionComponent extends AbstractComponent implements OnInit {
  expanded = true;
  containerType: string;

  get sectionTitle() {
    return this.options.notitle ? null : this.jsf.setItemTitle(this);
  }

  ngOnInit() {
    this.jsf.initializeControl(this);
    this.expanded =
      typeof this.options.expanded === 'boolean' ? this.options.expanded : !this.options.expandable;
    switch (this.layoutNode.type) {
      case 'fieldset':
      case 'array':
      case 'tab':
      case 'advancedfieldset':
      case 'authfieldset':
      case 'optionfieldset':
      case 'selectfieldset':
        this.containerType = 'fieldset';
        break;
      default: // 'div', 'flex', 'section', 'conditional', 'actions', 'tagsinput'
        this.containerType = 'div';
        break;
    }
  }

  toggleExpanded() {
    if (this.options.expandable) {
      this.expanded = !this.expanded;
    }
  }

  // Set attributes for flexbox container
  // (child attributes are set in root.component)
  getFlexAttribute(attribute: string) {
    const flexActive: boolean =
      this.layoutNode.type === 'flex' ||
      !!this.options.displayFlex ||
      this.options.display === 'flex';
    if (attribute !== 'flex' && !flexActive) {
      return null;
    }
    switch (attribute) {
      case 'is-flex':
        return flexActive;
      case 'display':
        return flexActive ? 'flex' : 'initial';
      case 'flex-direction':
      case 'flex-wrap':
        const index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
        return (
          (this.options['flex-flow'] || '').split(/\s+/)[index] ||
          this.options[attribute] ||
          ['column', 'nowrap'][index]
        );
      case 'justify-content':
      case 'align-items':
      case 'align-content':
        return this.options[attribute];
    }
  }
}
