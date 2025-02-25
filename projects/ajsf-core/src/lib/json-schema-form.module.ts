import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {JsonSchemaFormComponent} from './json-schema-form.component';

import {WidgetLibraryModule} from './widget-library/widget-library.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetLibraryModule,
    JsonSchemaFormComponent,
  ],
  exports: [JsonSchemaFormComponent, WidgetLibraryModule],
})
export class JsonSchemaFormModule {}
