import { createReducer, on } from '@ngrx/store';
import * as BookActions from './books.actions';
import { Book } from '../../../models/book.model';

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: any;
}

export const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

export const booksReducer = createReducer(
  initialState,

  // Load
  on(BookActions.loadBooks, state => ({ ...state, loading: true, error: null })),
  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books: books.map(book => ({
      ...book,
      authorId: Number(book.authorId)  // Ensure number type
    })),
    loading: false
  })),
  on(BookActions.loadBooksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Create
  on(BookActions.createBookSuccess, (state, { book }) => ({
    ...state,
    books: [...state.books, {
      ...book,
      authorId: Number(book.authorId)  // Ensure number type
    }]
  })),

  // Update
  on(BookActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    books: state.books.map(b => 
      b.id === book.id ? {
        ...book,
        authorId: Number(book.authorId)  // Ensure number type
      } : b
    )
  })),

  // Delete
  on(BookActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books.filter(b => b.id !== id)
  })),
);