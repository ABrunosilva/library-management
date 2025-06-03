import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { BooksState } from './books.reducer';

export const selectBooksState = (state: AppState) => state.books;

export const selectBooks = createSelector(
  selectBooksState,
  (state: BooksState) => state.books
);

export const selectAuthors = createSelector(
  selectBooksState,
  (state: BooksState) => state.authors
);

export const selectBooksByAuthor = createSelector(
  selectBooks,
  (books) => (authorId: number) =>
    books.filter(book => book.authorId === authorId)
);
export const selectBooksLoading = createSelector(
  selectBooksState,
  (state: BooksState) => state.loading
);