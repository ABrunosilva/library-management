// src/app/pages/logs/store/logs.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LogActions from './logs.actions';
import { LogService } from '../../../services/log.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LogsEffects {
  // Declare effect without initialization
  loadLogs$: any; 

  constructor(
    private actions$: Actions,
    private logService: LogService
  ) {
    // Initialize effect AFTER dependency injection
    this.loadLogs$ = createEffect(() => 
      this.actions$.pipe(
        ofType(LogActions.loadLogs),
        mergeMap(() =>
          this.logService.getLogs().pipe(
            map((logs) => LogActions.loadLogsSuccess({ logs })),
            catchError((error) => of(LogActions.loadLogsFailure({ error })))
          )
        )
      )
    );
  }
}