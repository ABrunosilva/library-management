// src/app/logs/store/logs.actions.ts
import { createAction, props } from '@ngrx/store';
import { Log } from '../../../models/log.model';

export const loadLogs = createAction('[Logs] Load Logs');
export const loadLogsSuccess = createAction('[Logs] Load Logs Success', props<{ logs: Log[] }>());
export const loadLogsFailure = createAction('[Logs] Load Logs Failure', props<{ error: any }>());
