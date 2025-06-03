// src/app/pages/logs/store/logs.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LogActions from './logs.actions';
import { LogService } from '../../../services/log.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class LogsEffects {
  private actions$ = inject(Actions);
  private logService = inject(LogService);

  loadLogs$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LogActions.loadLogs),
      tap(() => console.log('[Logs] Loading logs...')),
      mergeMap(() =>
        this.logService.getLogs().pipe(
          map((logs) => {
            console.log('[Logs] Load success:', logs);
            return LogActions.loadLogsSuccess({ logs });
          }),
          catchError((error) => {
            console.error('[Logs] Load error:', error);
            return of(LogActions.loadLogsFailure({ error }));
          })
        )
      )
    )
  );
}