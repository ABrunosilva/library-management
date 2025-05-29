import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';

@Injectable({ providedIn: 'root' })
export class LogService {
  private apiUrl = 'http://localhost:3000/logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.apiUrl);
  }

  addLog(log: Log): Observable<Log> {
    return this.http.post<Log>(this.apiUrl, log);
  }
}
