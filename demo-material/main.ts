import {enableProdMode, importProvidersFrom} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {provideRouter} from '@angular/router';
import {routes} from './app/demo.routes';
import {Bootstrap3FrameworkModule} from '@ajsf/bootstrap3';
import {Bootstrap4FrameworkModule} from '@ajsf/bootstrap4';
import {Bootstrap5FrameworkModule} from '@ajsf/bootstrap5';
import {MaterialDesignFrameworkModule} from '@ajsf/material';
import {JsonSchemaFormModule} from '@ajsf/core';
import {DemoRootComponent} from './app/demo-root.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DemoRootComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatIconModule,
      MatMenuModule,
      MatSelectModule,
      MatToolbarModule,
      Bootstrap3FrameworkModule,
      Bootstrap4FrameworkModule,
      Bootstrap5FrameworkModule,
      MaterialDesignFrameworkModule,
      JsonSchemaFormModule,
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ],
});
