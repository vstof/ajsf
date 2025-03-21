import {Injectable} from '@angular/core';
import {Framework} from './framework';
import {NoFrameworkComponent} from './no-framework.component';
// No framework - plain HTML controls (styles from form layout only)

@Injectable({providedIn: 'root'})
export class NoFramework extends Framework {
  name = 'no-framework';

  frameworkComponent = NoFrameworkComponent;
}
