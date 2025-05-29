// src/app/pages/books/store/books.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookActions from './books.actions';
import { LogService } from '../../../services/log.service';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private logService: LogService) {}

  logCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.createBookSuccess),
      mergeMap(({ book }) =>
        this.logService.addLog({
          action: 'create',
          entity: 'Book',
          timestamp: new Date().toISOString(),
          message: `Livro criado: ${book.title}`,
          details: book
        }).pipe(
          map(() => ({ type: '[Logs] Log Created' })),
          catchError(() => of({ type: '[Logs] Log Failed' }))
        )
      )
    )
  );

  logUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBookSuccess),
      mergeMap(({ book }) =>
        this.logService.addLog({
          action: 'update',
          entity: 'Book',
          timestamp: new Date().toISOString(),
          message: `Livro atualizado: ${book.title}`,
          details: book
        }).pipe(
          map(() => ({ type: '[Logs] Log Created' })),
          catchError(() => of({ type: '[Logs] Log Failed' }))
        )
      )
    )
  );

  logDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBookSuccess),
      mergeMap(({ id }) =>
        this.logService.addLog({
          action: 'delete',
          entity: 'Book',
          timestamp: new Date().toISOString(),
          message: `Livro excluído: ID ${id}`,
          details: { id }
        }).pipe(
          map(() => ({ type: '[Logs] Log Created' })),
          catchError(() => of({ type: '[Logs] Log Failed' }))
        )
      )
    )
  );
}
