import {Injectable} from '@angular/core';
import {Framework} from '@ajsf/core';
import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component';

// Bootstrap 5 Framework
// https://github.com/ng-bootstrap/ng-bootstrap
@Injectable({providedIn: 'root'})
export class Bootstrap5Framework implements Framework {
  name = 'bootstrap-5';

  frameworkComponent = Bootstrap5FrameworkComponent;
}
