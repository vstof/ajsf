import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Framework,
  JsonSchemaFormService,
  WidgetLibraryService,
  JsonSchemaFormModule,
  WidgetLibraryModule,
} from '@ajsf/core';
import {Bootstrap3Framework} from './bootstrap3.framework';
import {Bootstrap3FrameworkComponent} from './bootstrap3-framework.component';

@NgModule({
  imports: [JsonSchemaFormModule, CommonModule, WidgetLibraryModule],
  declarations: [Bootstrap3FrameworkComponent],
  exports: [JsonSchemaFormModule, Bootstrap3FrameworkComponent],
  providers: [
    JsonSchemaFormService,
    WidgetLibraryService,
    {provide: Framework, useClass: Bootstrap3Framework, multi: false},
  ],
})
export class Bootstrap3FrameworkModule {}
