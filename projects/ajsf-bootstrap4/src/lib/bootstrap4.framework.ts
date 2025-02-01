import {Injectable} from '@angular/core';
import {Framework} from '@ajsf/core';
import {Bootstrap4FrameworkComponent} from './bootstrap4-framework.component';

// Bootstrap 4 Framework
// https://github.com/ng-bootstrap/ng-bootstrap

@Injectable()
export class Bootstrap4Framework implements Framework {
  name = 'bootstrap-4';

  framework = Bootstrap4FrameworkComponent;
}
