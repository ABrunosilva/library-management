// src/app/store/state.module.ts
import { NgModule } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { booksReducer } from '../pages/books/store/books.reducer';
import { logsReducer } from '../pages/logs/store/logs.reducer';
import { BooksEffects } from '../pages/books/store/books.effects';
import { LogsEffects } from '../pages/logs/store/logs.effects';

@NgModule({
  providers: [
    provideStore(),
    provideState('books', booksReducer),
    provideState('logs', logsReducer),
    provideEffects(BooksEffects, LogsEffects)
  ]
})
export class StateModule {}