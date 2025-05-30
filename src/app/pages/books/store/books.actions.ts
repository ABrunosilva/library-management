import { createAction, props } from '@ngrx/store';
import { Book } from '../../../models/book.model'; // ajuste o caminho conforme o seu projeto

export const loadBooks = createAction('[Books] Load Books');

export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: any }>()
);

export const createBook = createAction(
  '[Books] Create Book',
  props<{ book: Book }>()
);

export const createBookSuccess = createAction(
  '[Books] Create Book Success',
  props<{ book: Book }>()
);

export const createBookFailure = createAction(
  '[Books] Create Book Failure',
  props<{ error: any }>()
);

export const updateBook = createAction(
  '[Books] Update Book',
  props<{ book: Book }>()
);

export const updateBookSuccess = createAction(
  '[Books] Update Book Success',
  props<{ book: Book }>()
);

export const updateBookFailure = createAction(
  '[Books] Update Book Failure',
  props<{ error: any }>()
);

export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ id: number }>()
);

export const deleteBookSuccess = createAction(
  '[Books] Delete Book Success',
  props<{ id: number }>()
);

export const deleteBookFailure = createAction(
  '[Books] Delete Book Failure',
  props<{ error: any }>()
);
