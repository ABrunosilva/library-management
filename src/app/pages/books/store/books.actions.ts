import { createAction, props } from '@ngrx/store';
import { Book } from '../../../models/book.model';
import { Author } from '../../../models/author.model';

// Load Books
export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>()
);
export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: any }>()
);

// Load Authors
export const loadAuthors = createAction('[Books] Load Authors');
export const loadAuthorsSuccess = createAction(
  '[Books] Load Authors Success',
  props<{ authors: Author[] }>()
);
export const loadAuthorsFailure = createAction(
  '[Books] Load Authors Failure',
  props<{ error: any }>()
);

// Create Book
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

// Update Book
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

// Delete Book
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
