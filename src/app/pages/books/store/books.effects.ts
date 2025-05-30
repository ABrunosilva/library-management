import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookActions from './books.actions';
import { BookService } from '../../../services/book.service';
import { LogService } from '../../../services/log.service';
import { mergeMap, map, catchError, of } from 'rxjs';
import { Book } from '../../../models/book.model';
import { Log } from '../../../models/log.model';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private bookService = inject(BookService);
  private logService = inject(LogService);

  // Load books
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      mergeMap(() =>
        this.bookService.getAll().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error })))
        )
      )
    )
  );

  // Create book
  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.createBook),
      mergeMap(({ book }) => {
        // Create payload without id
        const payload: Omit<Book, 'id'> = {
          title: book.title,
          authorId: Number(book.authorId), // Convert to number
          userId: book.userId ? Number(book.userId) : undefined
        };
        
        return this.bookService.create(payload).pipe(
          map(createdBook => BookActions.createBookSuccess({ book: createdBook })),
          catchError(error => of(BookActions.createBookFailure({ error })))
        );
      })
    )
  );

  // Log book creation
  logCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.createBookSuccess),
      mergeMap(({ book }) => {
        const logEntry: Log = {
          action: 'create',
          entity: 'Book',
          timestamp: new Date().toISOString(),
          message: `Livro criado: ${book.title}`,
          details: { 
            id: book.id,
            title: book.title,
            authorId: book.authorId,
            userId: book.userId
          }
        };
        
        return this.logService.addLog(logEntry).pipe(
          map(() => ({ type: '[Logs] Create Log Success' })),
          catchError(() => of({ type: '[Logs] Create Log Error' }))
        );
      })
    )
  );

  // Update book
  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBook),
      mergeMap(({ book }) => {
        if (!book.id) {
          return of(BookActions.updateBookFailure({ 
            error: new Error('Book ID is required for update') 
          }));
        }
        
        // Create update payload
        const payload: Partial<Book> = {
          title: book.title,
          authorId: book.authorId ? Number(book.authorId) : undefined,
          userId: book.userId ? Number(book.userId) : undefined
        };
        
        return this.bookService.update(book.id, payload).pipe(
          map(updatedBook => BookActions.updateBookSuccess({ book: updatedBook })),
          catchError(error => of(BookActions.updateBookFailure({ error })))
        );
      })
    )
  );

  // Log book update
  logUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBookSuccess),
      mergeMap(({ book }) => {
        const logEntry: Log = {
          action: 'update',
          entity: 'Book',
          timestamp: new Date().toISOString(),
          message: `Livro atualizado: ${book.title}`,
          details: {
            id: book.id,
            title: book.title,
            authorId: book.authorId,
            userId: book.userId
          }
        };
        
        return this.logService.addLog(logEntry).pipe(
          map(() => ({ type: '[Logs] Update Log Success' })),
          catchError(() => of({ type: '[Logs] Update Log Error' }))
        );
      })
    )
  );

  // Delete book
  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBook),
      mergeMap(({ id }) =>
        this.bookService.delete(id).pipe(
          map(() => BookActions.deleteBookSuccess({ id })),
          catchError(error => of(BookActions.deleteBookFailure({ error })))
        )
      )
    )
  );

  // Log book deletion
  logDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBookSuccess),
      mergeMap(({ id }) => {
        const logEntry: Log = {
          action: 'delete',
          entity: 'Book',
          timestamp: new Date().toISOString(),
          message: `Livro excluído: ID ${id}`,
          details: { id }
        };
        
        return this.logService.addLog(logEntry).pipe(
          map(() => ({ type: '[Logs] Delete Log Success' })),
          catchError(() => of({ type: '[Logs] Delete Log Error' }))
        );
      })
    )
  );
}