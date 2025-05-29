// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error.interceptor';

import { provideStore, provideState } from '@ngrx/store'; // Fixed import
import { provideEffects } from '@ngrx/effects';
import { logsReducer } from './pages/logs/store/logs.reducer';
import { LogsEffects } from './pages/logs/store/logs.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideState('logs', logsReducer),
    provideEffects(LogsEffects)
  ]
};