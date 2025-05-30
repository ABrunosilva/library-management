import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error.interceptor';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { booksReducer } from './pages/books/store/books.reducer';
import { logsReducer } from './pages/logs/store/logs.reducer';
import { BooksEffects } from './pages/books/store/books.effects';
import { LogsEffects } from './pages/logs/store/logs.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideRouter(routes),

    provideStore(),
    provideState('books', booksReducer),
    provideState('logs', logsReducer),

    provideEffects(BooksEffects, LogsEffects),
  ]
};
