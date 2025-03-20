import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Examples} from './example-schemas.model';
import {JsonPointer, JsonSchemaFormComponent} from '@ajsf/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AceEditorDirective} from './ace-editor.directive';

@Component({
  selector: 'app-demo',
  imports: [CommonModule, FormsModule, JsonSchemaFormComponent, AceEditorDirective],
  templateUrl: 'demo.component.html',
  animations: [
    trigger('expandSection', [
      state('in', style({height: '*'})),
      transition(':enter', [style({height: 0}), animate(100)]),
      transition(':leave', [style({height: '*'}), animate(100, style({height: 0}))]),
    ]),
  ],
})
export class DemoComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  examples: any = Examples;
  languageList: any = ['de', 'en', 'es', 'fr', 'it', 'pt', 'zh'];
  languages: any = {
    de: 'German',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    it: 'Italian',
    pt: 'Portuguese',
    zh: 'Chinese',
  };
  selectedSet = 'ng-jsf';
  selectedSetName = '';
  selectedExample = 'ng-jsf-flex-layout';
  selectedExampleName = 'Flexbox layout';
  selectedLanguage = 'en';
  visible = {
    options: true,
    schema: true,
    form: true,
    output: true,
  };

  formActive = false;
  jsonFormSchema: string;
  jsonFormValid = false;
  jsonFormStatusMessage = 'Loading form...';
  jsonFormObject: any;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defaultWidgetOptions: {feedback: true}, // Show inline feedback icons
  };
  liveFormData: any = {};
  formValidationErrors: any;
  formIsValid = null;
  submittedFormData: any = null;
  aceEditorOptions: any = {
    highlightActiveLine: true,
    maxLines: 1000,
    printMargin: false,
    autoScrollEditorIntoView: true,
  };

  ngOnInit() {
    // Subscribe to query string to detect schema to load
    this.route.queryParams.subscribe((params) => {
      if (params['set']) {
        this.selectedSet = params['set'];
        this.selectedSetName = {
          'ng-jsf': '',
          asf: 'Angular Schema Form:',
          rsf: 'React Schema Form:',
          jsf: 'JSONForm:',
        }[this.selectedSet];
      }
      if (params['example']) {
        this.selectedExample = params['example'];
        this.selectedExampleName = this.examples[this.selectedSet].schemas.find(
          (schema) => schema.file === this.selectedExample,
        ).name;
      }
      if (params['language']) {
        this.selectedLanguage = params['language'];
      }
      this.loadSelectedExample();
    });
  }

  onSubmit(data: any) {
    this.submittedFormData = data;
  }

  get prettySubmittedFormData() {
    return JSON.stringify(this.submittedFormData, null, 2);
  }

  onChanges(data: any) {
    this.liveFormData = data;
  }

  get prettyLiveFormData() {
    return JSON.stringify(this.liveFormData, null, 2);
  }

  isValid(isValid: boolean): void {
    this.formIsValid = isValid;
  }

  validationErrors(data: any): void {
    this.formValidationErrors = data;
  }

  get prettyValidationErrors() {
    if (!this.formValidationErrors) {
      return null;
    }
    const errorArray = [];
    for (const error of this.formValidationErrors) {
      const message = error.message;
      const dataPathArray = JsonPointer.parse(error.dataPath);
      if (dataPathArray.length) {
        let field = dataPathArray[0];
        for (let i = 1; i < dataPathArray.length; i++) {
          const key = dataPathArray[i];
          field += /^\d+$/.test(key) ? `[${key}]` : `.${key}`;
        }
        errorArray.push(`${field}: ${message}`);
      } else {
        errorArray.push(message);
      }
    }
    return errorArray.join('<br>');
  }

  loadSelectedExample(
    selectedSet: string = this.selectedSet,
    selectedSetName: string = this.selectedSetName,
    selectedExample: string = this.selectedExample,
    selectedExampleName: string = this.selectedExampleName,
  ) {
    if (selectedExample !== this.selectedExample) {
      this.formActive = false;
      this.selectedSet = selectedSet;
      this.selectedSetName = selectedSetName;
      this.selectedExample = selectedExample;
      this.selectedExampleName = selectedExampleName;
      this.router.navigateByUrl(
        '/?set=' +
          selectedSet +
          '&example=' +
          selectedExample +
          '&language=' +
          this.selectedLanguage,
      );
      this.liveFormData = {};
      this.submittedFormData = null;
      this.formIsValid = null;
      this.formValidationErrors = null;
    }
    const exampleURL = `assets/example-schemas/${this.selectedExample}.json`;
    this.http.get(exampleURL, {responseType: 'text'}).subscribe((schema) => {
      this.jsonFormSchema = schema;
      this.generateForm(this.jsonFormSchema);
    });
  }

  loadSelectedLanguage() {
    window.location.href = `${window.location.pathname}?set=${this.selectedSet}&example=${this.selectedExample}&language=${this.selectedLanguage}`;
  }

  // Display the form entered by the user
  // (runs whenever the user changes the jsonform object in the ACE input field)
  generateForm(newFormString: string) {
    if (!newFormString) {
      return;
    }
    this.jsonFormStatusMessage = 'Loading form...';
    this.formActive = false;
    this.liveFormData = {};
    this.submittedFormData = null;

    // Most examples should be written in pure JSON,
    // but if an example schema includes a function,
    // it will be compiled it as Javascript instead
    try {
      // Parse entered content as JSON
      this.jsonFormObject = JSON.parse(newFormString);
      this.jsonFormValid = true;
    } catch (jsonError) {
      try {
        // If entered content is not valid JSON,
        // parse as JavaScript instead to include functions
        const newFormObject: any = null;
        /* tslint:disable */
        eval('newFormObject = ' + newFormString);
        /* tslint:enable */
        this.jsonFormObject = newFormObject;
        this.jsonFormValid = true;
      } catch (javascriptError) {
        // If entered content is not valid JSON or JavaScript, show error
        this.jsonFormValid = false;
        this.jsonFormStatusMessage =
          'Entered content is not currently a valid JSON Form object.\n' +
          'As soon as it is, you will see your form here. So keep typing. :-)\n\n' +
          'JavaScript parser returned:\n\n' +
          jsonError;
        return;
      }
    }
    this.formActive = true;
  }

  toggleVisible(item: string) {
    this.visible[item] = !this.visible[item];
  }

  toggleFormOption(option: string) {
    if (option === 'feedback') {
      this.jsonFormOptions.defaultWidgetOptions.feedback =
        !this.jsonFormOptions.defaultWidgetOptions.feedback;
    } else {
      this.jsonFormOptions[option] = !this.jsonFormOptions[option];
    }
    this.generateForm(this.jsonFormSchema);
  }
}
