import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { loadFetchTracker } from './tool-sidebar';

if (environment.production) {
  enableProdMode();
} 

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

loadFetchTracker();
