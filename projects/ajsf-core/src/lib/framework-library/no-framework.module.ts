import {CommonModule} from '@angular/common';
import {Framework} from './framework';
import {NgModule} from '@angular/core';
import {NoFramework} from './no.framework';
import {NoFrameworkComponent} from './no-framework.component';
import {WidgetLibraryModule} from '../widget-library/widget-library.module';

// No framework - plain HTML controls (styles from form layout only)

@NgModule({
  imports: [CommonModule, WidgetLibraryModule, NoFrameworkComponent],
  exports: [NoFrameworkComponent],
  providers: [WidgetLibraryModule, {provide: Framework, useClass: NoFramework, multi: false}],
})
export class NoFrameworkModule {}
