// src/app/logs/logs.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LogsState } from './store/logs.reducer';
import * as LogActions from './store/logs.actions';
import * as LogSelectors from './store/logs.selectors';
import { Observable } from 'rxjs';
import { Log } from '../../models/log.model';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Logs do Sistema</h1>

      <div *ngIf="loading$ | async" class="mb-4 text-blue-600">Carregando logs...</div>
      <div *ngIf="error$ | async as error" class="mb-4 text-red-600">Erro: {{ error }}</div>

      <table *ngIf="logs$ | async as logs" class="w-full table-auto bg-white shadow rounded">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="text-left px-4 py-2">Data/Hora</th>
            <th class="text-left px-4 py-2">Ação</th>
            <th class="text-left px-4 py-2">Entidade</th>
            <th class="text-left px-4 py-2">Mensagem</th>
            <th class="text-left px-4 py-2">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let log of logs" class="border-t">
            <td class="px-4 py-2">{{ log.timestamp | date: 'short' }}</td>
            <td class="px-4 py-2 capitalize">{{ log.action }}</td>
            <td class="px-4 py-2">{{ log.entity }}</td>
            <td class="px-4 py-2">{{ log.message }}</td>
            <td class="px-4 py-2">
              <pre class="whitespace-pre-wrap">{{ log.details | json }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class LogsComponent implements OnInit {
  logs$!: Observable<Log[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store<LogsState>) {}

  ngOnInit() {
    this.store.dispatch(LogActions.loadLogs());
    this.logs$ = this.store.select(LogSelectors.selectAllLogs);
    this.loading$ = this.store.select(LogSelectors.selectLogsLoading);
    this.error$ = this.store.select(LogSelectors.selectLogsError);
  }
}
