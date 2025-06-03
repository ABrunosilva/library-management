import { createReducer, on } from '@ngrx/store';
import * as BookActions from './books.actions';
import { Book } from '../../../models/book.model';
import { Author } from '../../../models/author.model';

export interface BooksState {
  books: Book[];
  authors: Author[];
  loading: boolean;
  error: any;
}

export const initialState: BooksState = {
  books: [],
  authors: [],
  loading: false,
  error: null,
};

export const booksReducer = createReducer(
  initialState,

  // Books
  on(BookActions.loadBooks, state => ({ ...state, loading: true, error: null })),
  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books: books.map(book => ({
      ...book,
      authorId: Number(book.authorId)
    })),
    loading: false
  })),
  on(BookActions.loadBooksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Authors
  on(BookActions.loadAuthors, state => ({ ...state, loading: true, error: null })),
  on(BookActions.loadAuthorsSuccess, (state, { authors }) => ({
    ...state,
    authors,
    loading: false
  })),
  on(BookActions.loadAuthorsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Create
  on(BookActions.createBookSuccess, (state, { book }) => ({
    ...state,
    books: [...state.books, { ...book, authorId: Number(book.authorId) }]
  })),

  // Update
  on(BookActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    books: state.books.map(b => 
      b.id === book.id ? { ...book, authorId: Number(book.authorId) } : b
    )
  })),

  // Delete
  on(BookActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books.filter(b => b.id !== id)
  }))
);
