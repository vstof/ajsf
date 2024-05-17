import { Injectable } from "@angular/core";
import { Framework } from "@ajsf/core";
import { Bootstrap5FrameworkComponent } from "./bootstrap5-framework.component";
import { ExtendedTextareaComponent } from "./widgets/extended-textarea.component";

// Bootstrap 5 Framework
// https://github.com/ng-bootstrap/ng-bootstrap

@Injectable()
export class Bootstrap5Framework extends Framework {
  name = "bootstrap-5";

  framework = Bootstrap5FrameworkComponent;

  override widgets = {
    textarea: ExtendedTextareaComponent,
  };
  stylesheets = ["//cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"];

  scripts = ["//cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"];
}
