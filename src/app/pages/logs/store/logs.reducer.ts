// src/app/logs/store/logs.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as LogActions from './logs.actions';
import { Log } from '../../../models/log.model';

export interface LogsState {
  logs: Log[];
  loading: boolean;
  error: any;
}

export const initialState: LogsState = {
  logs: [],
  loading: false,
  error: null
};

export const logsReducer = createReducer(
  initialState,
  on(LogActions.loadLogs, (state) => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(LogActions.loadLogsSuccess, (state, { logs }) => ({ 
    ...state, 
    loading: false, 
    logs 
  })),
  on(LogActions.loadLogsFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  })),
  on(LogActions.addLog, (state, { log }) => ({
    ...state,
    logs: [log, ...state.logs]  // Newest first
  }))
);