import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { asyncTrace } from '../../../src/async-trace';

if (environment.production) {
  enableProdMode();
}

const [error, asyncZone] = asyncTrace.setUp({ enableDevMode: true }).createZone();

if (error) { console.error(error); }

platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZone: asyncZone as any })
  .catch(err => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch(err => console.error(err));
