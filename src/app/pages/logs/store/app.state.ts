// src/app/store/app.state.ts
import { BooksState } from '../../books/store/books.reducer';
import { LogsState } from './logs.reducer';

export interface AppState {
  books: BooksState;
  logs: LogsState;
  // Add other state interfaces as needed
}