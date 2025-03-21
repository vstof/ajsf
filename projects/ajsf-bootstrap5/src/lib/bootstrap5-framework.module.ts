import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Framework,
  JsonSchemaFormService,
  WidgetLibraryService,
  JsonSchemaFormModule,
  WidgetLibraryModule,
} from '@ajsf/core';
import {Bootstrap5Framework} from './bootstrap5.framework';
import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component';

@NgModule({
  imports: [JsonSchemaFormModule, CommonModule, WidgetLibraryModule, Bootstrap5FrameworkComponent],
  exports: [JsonSchemaFormModule, Bootstrap5FrameworkComponent],
  providers: [
    JsonSchemaFormService,
    WidgetLibraryService,
    {provide: Framework, useClass: Bootstrap5Framework, multi: false},
  ],
})
export class Bootstrap5FrameworkModule {}
