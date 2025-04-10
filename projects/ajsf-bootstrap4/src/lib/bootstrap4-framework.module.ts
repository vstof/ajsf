import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Framework,
  JsonSchemaFormService,
  WidgetLibraryService,
  JsonSchemaFormModule,
  WidgetLibraryModule,
} from '@ajsf/core';
import {Bootstrap4Framework} from './bootstrap4.framework';
import {Bootstrap4FrameworkComponent} from './bootstrap4-framework.component';

@NgModule({
  imports: [JsonSchemaFormModule, CommonModule, WidgetLibraryModule],
  declarations: [Bootstrap4FrameworkComponent],
  exports: [JsonSchemaFormModule, Bootstrap4FrameworkComponent],
  providers: [
    JsonSchemaFormService,
    WidgetLibraryService,
    {provide: Framework, useClass: Bootstrap4Framework, multi: false},
  ],
})
export class Bootstrap4FrameworkModule {}
