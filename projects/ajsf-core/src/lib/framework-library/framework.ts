import {Injectable} from '@angular/core';
import {NoFrameworkComponent} from './no-framework.component';
import {AbstractComponent} from '../widget-library/abstract.component';

@Injectable()
export abstract class Framework {
  abstract name: string;
  abstract frameworkComponent: typeof NoFrameworkComponent;
  widgets?: {[key: string]: typeof AbstractComponent | string};
}
