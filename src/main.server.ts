// src/main.server.ts
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

export default function () {
  return bootstrapApplication(AppComponent, appConfig);
}
