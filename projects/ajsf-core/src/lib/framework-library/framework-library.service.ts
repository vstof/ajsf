import {Framework} from './framework';
import {hasOwn} from '../shared/utility.functions';
import {Injectable, inject} from '@angular/core';
import {WidgetLibraryService} from '../widget-library/widget-library.service';

// Possible future frameworks:
// - Foundation 6:
//   http://justindavis.co/2017/06/15/using-foundation-6-in-angular-4/
//   https://github.com/zurb/foundation-sites
// - Semantic UI:
//   https://github.com/edcarroll/ng2-semantic-ui
//   https://github.com/vladotesanovic/ngSemantic

@Injectable({
  providedIn: 'root',
})
export class FrameworkLibraryService {
  private frameworks = inject(Framework);
  private widgetLibrary = inject<WidgetLibraryService>(WidgetLibraryService);

  activeFramework: Framework = null;
  defaultFramework: string;
  frameworkLibrary: {[name: string]: Framework} = {};

  constructor() {
    this.frameworks.forEach((framework) => (this.frameworkLibrary[framework.name] = framework));
    this.defaultFramework = this.frameworks[0].name;
    this.setFramework(this.defaultFramework);
  }

  public setFramework(framework: string | Framework = this.defaultFramework): boolean {
    this.activeFramework =
      typeof framework === 'string' && this.hasFramework(framework)
        ? this.frameworkLibrary[framework]
        : typeof framework === 'object' && hasOwn(framework, 'framework')
          ? framework
          : this.frameworkLibrary[this.defaultFramework];
    return this.registerFrameworkWidgets(this.activeFramework);
  }

  registerFrameworkWidgets(framework: Framework): boolean {
    return hasOwn(framework, 'widgets')
      ? this.widgetLibrary.registerFrameworkWidgets(framework.widgets)
      : this.widgetLibrary.unRegisterFrameworkWidgets();
  }

  public hasFramework(type: string): boolean {
    return hasOwn(this.frameworkLibrary, type);
  }

  public getFramework(): Framework {
    if (!this.activeFramework) {
      this.setFramework('default');
    }
    return this.activeFramework.framework;
  }

  public getFrameworkWidgets(): any {
    return this.activeFramework.widgets || {};
  }
}
