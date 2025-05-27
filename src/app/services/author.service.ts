import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../models/author.model';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private apiUrl = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) {}

  private get authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  create(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, author: Author): Observable<Author> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Author>(url, author, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erro no AuthorService:', error);
    return throwError(() => new Error('Erro na comunicação com o servidor.'));
  }
}
