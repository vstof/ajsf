import {Injectable} from '@angular/core';
import {Framework} from '@ajsf/core';
import {Bootstrap3FrameworkComponent} from './bootstrap3-framework.component';

// Bootstrap 3 Framework
// https://github.com/valor-software/ng2-bootstrap

@Injectable({providedIn: 'root'})
export class Bootstrap3Framework implements Framework {
  name = 'bootstrap-3';

  frameworkComponent = Bootstrap3FrameworkComponent;
}
