/**
 * Sources:
 *
 * Angular JSON Schema Form examples ('ng-jsf-...') are original
 *
 * JSON Meta-Schemas ('json-schema-...') are from
 *   http://json-schema.org/specification-links.html
 *
 * Angular Schema Form (AngularJS) examples ('asf-...') are from
 *   http://schemaform.io/examples/bootstrap-example.html
 *
 * React JSON Schema Form examples ('rjsf-...') are from
 *   https://mozilla-services.github.io/react-jsonschema-form/
 *
 * JSONForm (jQuery) examples ('jsf-...') are from
 *   http://ulion.github.io/jsonform/playground/
 */

export const Examples: any = {
  'ng-jsf': {
    name: 'Angular JSON Schema Form examples',
    schemas: [
      {name: 'Flexbox layout', file: 'ng-jsf-flex-layout'},
      // { name: 'Simple Array',                    file: 'ng-jsf-simple-array', },
      {name: 'Nested Arrays', file: 'ng-jsf-nested-arrays'},
      {name: 'Deep Recursive References', file: 'ng-jsf-deep-ref'},
      {name: 'Select Control Lists', file: 'ng-jsf-select-list-examples'},
      // { name: 'Select Control Widgets',          file: 'ng-jsf-select-widget-examples', },
      {name: 'Data Only (no Schema or Layout)', file: 'ng-jsf-data-only'},
      // { name: 'Layout Only (no Schema or Data)', file: 'ng-jsf-layout-only', },
      // { name: 'JSON Meta-Schema - Draft 6',    file: 'json-schema-draft06', },
      // { name: 'JSON Meta-Schema - Draft 4',    file: 'json-schema-draft04', },
      // { name: 'JSON Meta-Schema - Draft 3',    file: 'json-schema-draft03', },
      // { name: 'JSON Meta-Schema - Draft 2',    file: 'json-schema-draft02', },
      // { name: 'JSON Meta-Schema - Draft 1',    file: 'json-schema-draft01', },
    ],
  },
  asf: {
    name: 'Angular Schema Form (AngularJS) examples',
    url: 'http://schemaform.io/examples/bootstrap-example.html',
    schemas: [
      {name: 'Simple', file: 'asf-simple'},
      {name: 'Basic JSON Schema Type', file: 'asf-basic-json-schema-type'},
      {name: 'Bootstrap Grid', file: 'asf-bootstrap-grid'},
      {name: 'Complex Key Support', file: 'asf-complex-key-support'},
      {name: 'Array', file: 'asf-array'},
      {name: 'Tab Array', file: 'asf-tab-array'},
      {name: 'TitleMap Examples', file: 'asf-titlemap-examples'},
      {name: 'Kitchen Sink', file: 'asf-kitchen-sink'},
      {name: 'Hack: Conditional Required', file: 'asf-hack-conditional-required'},
    ],
  },
  rjsf: {
    name: 'React JSON Schema Form examples',
    url: 'https://mozilla-services.github.io/react-jsonschema-form/',
    schemas: [
      {name: 'Simple', file: 'rjsf-simple'},
      {name: 'Nested', file: 'rjsf-nested'},
      {name: 'Arrays', file: 'rjsf-arrays'},
      {name: 'Numbers', file: 'rjsf-numbers'},
      {name: 'Widgets', file: 'rjsf-widgets'},
      {name: 'Ordering', file: 'rjsf-ordering'},
      {name: 'References', file: 'rjsf-references'},
      {name: 'Custom', file: 'rjsf-custom'},
      {name: 'Errors', file: 'rjsf-errors'},
      {name: 'Large', file: 'rjsf-large'},
      {name: 'Date & Time', file: 'rjsf-date-and-time'},
      {name: 'Validation', file: 'rjsf-validation'},
      {name: 'Files', file: 'rjsf-files'},
      {name: 'Single', file: 'rjsf-single'},
      // { name: 'Custom Array',               file: 'rjsf-custom-array', },
      {name: 'Alternatives', file: 'rjsf-alternatives'},
    ],
  },
  jsf: {
    name: 'JSONForm (jQuery) examples',
    url: 'http://ulion.github.io/jsonform/playground/',
    schemas: [
      {
        name: 'Getting started',
        file: 'jsf-gettingstarted',
        urlParameters: '?example=gettingstarted',
      },
      {
        name: 'JSON Schema - A basic example',
        file: 'jsf-schema-basic',
        urlParameters: '?example=schema-basic',
      },
      {
        name: 'JSON Schema - Slightly more complex example',
        file: 'jsf-schema-morecomplex',
        urlParameters: '?example=schema-morecomplex',
      },
      {
        name: 'JSON Schema - Arrays',
        file: 'jsf-schema-array',
        urlParameters: '?example=schema-array',
      },
      {
        name: 'JSON Schema - Required field',
        file: 'jsf-schema-required',
        urlParameters: '?example=schema-required',
      },
      {
        name: 'JSON Schema - Default values',
        file: 'jsf-schema-default',
        urlParameters: '?example=schema-default',
      },
      {
        name: 'JSON Schema - Inline $ref to definitions',
        file: 'jsf-schema-inlineref',
        urlParameters: '?example=schema-inlineref',
      },
      {
        name: 'Fields - Common properties',
        file: 'jsf-fields-common',
        urlParameters: '?example=fields-common',
      },
      {
        name: 'Fields - Gathering secrets: the password type',
        file: 'jsf-fields-password',
        urlParameters: '?example=fields-password',
      },
      {
        name: 'Fields - Large text: the textarea type',
        file: 'jsf-fields-textarea',
        urlParameters: '?example=fields-textarea',
      },
      {
        name: 'Fields - text field with jquery-ui autocomplete',
        file: 'jsf-fields-autocomplete',
        urlParameters: '?example=fields-autocomplete',
      },
      {
        name: 'Fields - Code (JavaScript, JSON...): the ace type',
        file: 'jsf-fields-ace',
        urlParameters: '?example=fields-ace',
      },
      {
        name: 'Fields - Color picker: the color type',
        file: 'jsf-fields-color',
        urlParameters: '?example=fields-color',
      },
      {
        name: 'Fields - Boolean flag: the checkbox type',
        file: 'jsf-fields-checkbox',
        urlParameters: '?example=fields-checkbox',
      },
      {
        name: 'Fields - Multiple options: the checkboxes type',
        file: 'jsf-fields-checkboxes',
        urlParameters: '?example=fields-checkboxes',
      },
      {
        name: 'Fields - Selection list: the select type',
        file: 'jsf-fields-select',
        urlParameters: '?example=fields-select',
      },
      {
        name: 'Fields - A list of radio buttons: the radios type',
        file: 'jsf-fields-radios',
        urlParameters: '?example=fields-radios',
      },
      {
        name: 'Fields - Radio buttons as real buttons: the radio buttons type',
        file: 'jsf-fields-radiobuttons',
        urlParameters: '?example=fields-radiobuttons',
      },
      {
        name: 'Fields - Checkbox buttons: the checkbox buttons type',
        file: 'jsf-fields-checkboxbuttons',
        urlParameters: '?example=fields-checkboxbuttons',
      },
      {
        name: 'Fields - Number: the range type',
        file: 'jsf-fields-range',
        urlParameters: '?example=fields-range',
      },
      {
        name: 'Fields - Image selector: the imageselect type',
        file: 'jsf-fields-imageselect',
        urlParameters: '?example=fields-imageselect',
      },
      {
        name: 'Fields - Icon selector: the iconselect type',
        file: 'jsf-fields-iconselect',
        urlParameters: '?example=fields-iconselect',
      },
      {
        name: 'Fields - Grouping: the fieldset type',
        file: 'jsf-fields-fieldset',
        urlParameters: '?example=fields-fieldset',
      },
      {
        name: 'Fields - Advanced options section: the advancedfieldset type',
        file: 'jsf-fields-advancedfieldset',
        urlParameters: '?example=fields-advancedfieldset',
      },
      {
        name: 'Fields - Authentication settings section: the authfieldset type',
        file: 'jsf-fields-authfieldset',
        urlParameters: '?example=fields-authfieldset',
      },
      {
        name: 'Fields - Generic group: the section type',
        file: 'jsf-fields-section',
        urlParameters: '?example=fields-section',
      },
      {
        name: 'Fields - Group of buttons: the actions type',
        file: 'jsf-fields-actions',
        urlParameters: '?example=fields-actions',
      },
      {
        name: 'Fields - Generic array: the array type (complex)',
        file: 'jsf-fields-array',
        urlParameters: '?example=fields-array',
      },
      {
        name: 'Fields - Generic array: the array type (simple)',
        file: 'jsf-fields-array-simple',
        urlParameters: '?example=fields-array-simple',
      },
      {
        name: 'Fields - Arrays with tabs: the tabarray type',
        file: 'jsf-fields-tabarray',
        urlParameters: '?example=fields-tabarray',
      },
      {
        name: 'Fields - Arrays with tabs: the tabarray type w/ maxItems',
        file: 'jsf-fields-tabarray-maxitems',
        urlParameters: '?example=fields-tabarray-maxitems',
      },
      {
        name: 'Fields - Arrays with tabs: the tabarray type w/ default & legend',
        file: 'jsf-fields-tabarray-value',
        urlParameters: '?example=fields-tabarray-value',
      },
      {
        name: 'Fields - Alternative: the selectfieldset type',
        file: 'jsf-fields-selectfieldset',
        urlParameters: '?example=fields-selectfieldset',
      },
      {
        name: 'Fields - Alternative with schema key',
        file: 'jsf-fields-selectfieldset-key',
        urlParameters: '?example=fields-selectfieldset-key',
      },
      {
        name: 'Fields - Submit the form: the submit type',
        file: 'jsf-fields-submit',
        urlParameters: '?example=fields-submit',
      },
      {
        name: 'Fields - Guide users: the help type',
        file: 'jsf-fields-help',
        urlParameters: '?example=fields-help',
      },
      {
        name: 'Fields - Hidden form values: the hidden type',
        file: 'jsf-fields-hidden',
        urlParameters: '?example=fields-hidden',
      },
      {
        name: 'Fields - Series of questions: the questions type',
        file: 'jsf-fields-questions',
        urlParameters: '?example=fields-questions',
      },
      {
        name: 'Templating - item index with idx',
        file: 'jsf-templating-idx',
        urlParameters: '?example=templating-idx',
      },
      {
        name: 'Templating - tab legend with value and valueInLegend',
        file: 'jsf-templating-value',
        urlParameters: '?example=templating-value',
      },
      {
        name: 'Templating - values.xxx to reference another field',
        file: 'jsf-templating-values',
        urlParameters: '?example=templating-values',
      },
      {
        name: 'Templating - Using the tpldata property',
        file: 'jsf-templating-tpldata',
        urlParameters: '?example=templating-tpldata',
      },
      {name: 'Using event handlers', file: 'jsf-events', urlParameters: '?example=events'},
      {
        name: 'Using previously submitted values',
        file: 'jsf-previousvalues',
        urlParameters: '?example=previousvalues',
      },
      {
        name: 'Using previously submitted values - Multidimensional arrays',
        file: 'jsf-previousvalues-multidimensional',
        urlParameters: '?example=previousvalues-multidimensional',
      },
    ],
  },
};
