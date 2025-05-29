import { createAction, props } from '@ngrx/store';
import { Book } from '../../../models/book.model';


// Ações para carregar livros
export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>()
);
export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: any }>()
);

// Ações para criar livro
export const createBook = createAction(
  '[Books] Create Book',
  props<{ book: Partial<Book> }>()
);
export const createBookSuccess = createAction(
  '[Books] Create Book Success',
  props<{ book: Book }>()
);
export const createBookFailure = createAction(
  '[Books] Create Book Failure',
  props<{ error: any }>()
);

// Ações para atualizar livro
export const updateBook = createAction(
  '[Books] Update Book',
  props<{ id: number; book: Partial<Book> }>()
);
export const updateBookSuccess = createAction(
  '[Books] Update Book Success',
  props<{ book: Book }>()
);
export const updateBookFailure = createAction(
  '[Books] Update Book Failure',
  props<{ error: any }>()
);

// Ações para deletar livro
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
