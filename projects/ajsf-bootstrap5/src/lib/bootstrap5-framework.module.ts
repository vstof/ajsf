import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Framework,
  JsonSchemaFormService,
  WidgetLibraryService,
  FrameworkLibraryService,
  JsonSchemaFormModule,
  WidgetLibraryModule,
} from '@ajsf/core';
import {Bootstrap5Framework} from './bootstrap5.framework';
import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component';
import {ExtendedTextareaComponent} from './widgets/extended-textarea.component';

@NgModule({
  imports: [JsonSchemaFormModule, CommonModule, WidgetLibraryModule],
  declarations: [ExtendedTextareaComponent, Bootstrap5FrameworkComponent],
  exports: [JsonSchemaFormModule, ExtendedTextareaComponent, Bootstrap5FrameworkComponent],
  providers: [
    JsonSchemaFormService,
    FrameworkLibraryService,
    WidgetLibraryService,
    {provide: Framework, useClass: Bootstrap5Framework, multi: true},
  ],
})
export class Bootstrap5FrameworkModule {}
