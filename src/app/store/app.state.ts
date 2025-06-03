// src/app/store/app.state.ts
import { BooksState } from '../pages/books/store/books.reducer';
import { LogsState } from '../pages/logs/store/logs.reducer';

export interface AppState {
  books: BooksState;
  logs: LogsState;
}