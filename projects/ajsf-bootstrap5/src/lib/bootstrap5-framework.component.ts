import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

import cloneDeep from 'lodash-es/cloneDeep';
import map from 'lodash-es/map';
import {JsonSchemaFormService, addClasses, inArray} from '@ajsf/core';
import {NoFrameworkComponent} from '@ajsf/core/framework-library/no-framework.component';
import {NgComponentOutlet} from '@angular/common';

/**
 * Bootstrap 5 framework for Angular JSON Schema Form.
 *
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bootstrap-5-framework',
  templateUrl: './bootstrap5-framework.component.html',
  styleUrls: ['./bootstrap5-framework.component.scss'],
  imports: [NgComponentOutlet],
})
export class Bootstrap5FrameworkComponent
  extends NoFrameworkComponent
  implements OnInit, OnChanges
{
  ngOnInit() {
    this.initializeFramework();
    if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
      this.parentArray = this.jsf.getParentNode(this);
      if (this.parentArray) {
        this.isOrderable =
          this.layoutNode.arrayItemType === 'list' &&
          !this.options.readonly &&
          this.parentArray.options.orderable;
      }
    }
  }

  ngOnChanges() {
    if (!this.frameworkInitialized) {
      this.initializeFramework();
    }
  }

  initializeFramework() {
    if (this.layoutNode) {
      this.options = cloneDeep(this.layoutNode.options) || {};
      this.widgetLayoutNode = {
        ...this.layoutNode,
        options: cloneDeep(this.layoutNode.options),
      };
      this.widgetOptions = this.widgetLayoutNode.options || {};
      this.formControl = this.jsf.getFormControl(this);
      this.options.isInputWidget = inArray(this.layoutNode.type, [
        'button',
        'checkbox',
        'checkboxes-inline',
        'checkboxes',
        'color',
        'date',
        'datetime-local',
        'datetime',
        'email',
        'file',
        'hidden',
        'image',
        'integer',
        'month',
        'number',
        'password',
        'radio',
        'radiobuttons',
        'radios-inline',
        'radios',
        'range',
        'reset',
        'search',
        'select',
        'submit',
        'tel',
        'text',
        'textarea',
        'time',
        'url',
        'week',
      ]);

      this.options.title = this.setTitle();

      /*
      this.options.htmlClass = addClasses(
        this.options.htmlClass,
        "schema-form-" + this.layoutNode.type
      );
      */
      this.options.htmlClass =
        this.layoutNode.type === 'array'
          ? addClasses(this.options.htmlClass, 'list-group')
          : this.layoutNode.arrayItem && this.layoutNode.type !== '$ref'
            ? addClasses(this.options.htmlClass, 'list-group-item')
            : addClasses(this.options.htmlClass, 'form-group');

      this.widgetOptions.htmlClass = '';
      this.options.labelHtmlClass = addClasses(this.options.labelHtmlClass, 'form-label');
      this.widgetOptions.activeClass = addClasses(this.widgetOptions.activeClass, 'active');
      this.options.fieldAddonLeft = this.options.fieldAddonLeft || this.options.prepend;
      this.options.fieldAddonRight = this.options.fieldAddonRight || this.options.append;

      // Set miscelaneous styles and settings for each control type
      switch (this.layoutNode.type) {
        // Checkbox controls
        case 'checkbox':
        case 'checkboxes':
        case 'radio':
        case 'radios':
          this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'form-check');
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            'form-check-input',
          );
          this.widgetOptions.itemLabelHtmlClass = addClasses(
            this.widgetOptions.itemLabelHtmlClass,
            'form-check-label',
          );

          break;
        case 'checkboxes-inline':
        case 'radios-inline':
          this.widgetOptions.htmlClass = addClasses(
            this.widgetOptions.htmlClass,
            'form-check form-check-inline',
          );
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            'form-check-input',
          );
          this.widgetOptions.itemLabelHtmlClass = addClasses(
            this.widgetOptions.itemLabelHtmlClass,
            'form-check-label',
          );
          break;
        case 'select':
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            'form-select',
          );
          break;
        // Button sets - checkboxbuttons and radiobuttons
        case 'checkboxbuttons':
        case 'radiobuttons':
          this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'btn-group');
          this.widgetOptions.itemLabelHtmlClass = addClasses(
            this.widgetOptions.itemLabelHtmlClass,
            'btn',
          );
          this.widgetOptions.itemLabelHtmlClass = addClasses(
            this.widgetOptions.itemLabelHtmlClass,
            this.options.style || 'btn-default',
          );
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            'sr-only',
          );
          break;
        // Single button controls
        case 'button':
        case 'submit':
          this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn');
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            this.options.style || 'btn-info',
          );
          break;
        // Containers - arrays and fieldsets
        case 'array':
        case 'fieldset':
        case 'section':
        case 'conditional':
        case 'advancedfieldset':
        case 'authfieldset':
        case 'selectfieldset':
        case 'optionfieldset':
          this.options.messageLocation = 'top';
          this.widgetOptions.labelHtmlClass = 'float-none w-auto ms-3 ps-1 pe-1';
          this.widgetOptions.htmlClass = 'border p-3 mb-3';
          this.options.fieldContainerHtmlClass = '';
          break;
        case 'tabarray':
        case 'tabs':
          this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'tab-content');
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            'tab-pane',
          );
          this.widgetOptions.labelHtmlClass = addClasses(
            this.widgetOptions.labelHtmlClass,
            'nav nav-tabs',
          );
          break;
        // 'Add' buttons - references
        case '$ref':
          this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn');
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            this.options.style || 'btn btn-outline-primary float-end mt-1',
          );
          this.options.icon = 'fas fa-plus';
          break;
        // Default - including regular inputs
        default:
          this.widgetOptions.fieldHtmlClass = addClasses(
            this.widgetOptions.fieldHtmlClass,
            'form-control',
          );
      }

      if (this.formControl) {
        this.updateHelpBlock(this.formControl.status);
        this.formControl.statusChanges.subscribe((status) => this.updateHelpBlock(status));

        if (this.options.debug) {
          const vars: any[] = [];
          this.debugOutput = map(vars, (thisVar) => JSON.stringify(thisVar, null, 2)).join('\n');
        }
      }
      this.frameworkInitialized = true;
    }
  }

  updateHelpBlock(status) {
    this.options.errorMessage = this.jsf.formatErrors(
      this.formControl.errors,
      this.options.validationMessages ?? {},
    );
  }

  /*
  updateHelpBlock(status) {
    if (this.options?.validationMessages) {
      this.options.errorMessage = this.jsf.formatErrors(this.formControl.errors, this.options.validationMessages);
    } 
    this.options.helpBlock = status === 'INVALID' &&
    this.options.enableErrorState && this.formControl.errors &&
    (this.formControl.dirty || this.options.feedbackOnRender) ?
      this.jsf.formatErrors(this.formControl.errors, this.options.validationMessages) :
      this.options.description || this.options.help || null;
      
  }
  */

  setTitle(): string {
    switch (this.layoutNode.type) {
      case 'button':
      case 'checkbox':
      case 'section':
      case 'help':
      case 'msg':
      case 'submit':
      case 'message':
      case 'tabarray':
      case 'tabs':
      case '$ref':
        return null;
      case 'advancedfieldset':
        this.widgetOptions.expandable = true;
        this.widgetOptions.title = 'Advanced options';
        return null;
      case 'authfieldset':
        this.widgetOptions.expandable = true;
        this.widgetOptions.title = 'Authentication settings';
        return null;
      case 'fieldset':
        this.widgetOptions.title = this.options.title;
        return null;
      default:
        this.widgetOptions.title = null;
        return this.jsf.setItemTitle(this);
    }
  }

  removeItem() {
    this.jsf.removeItem(this);
  }
}
