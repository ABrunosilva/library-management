import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../models/author.model';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private apiUrl = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) {}

  private get authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  create(author: Omit<Author, 'id'>): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, author: Partial<Author>): Observable<Author> {
    return this.http.patch<Author>(`${this.apiUrl}/${id}`, author, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('AuthorService Error:', error);
    
    let errorMessage = 'Erro na comunicação com o servidor';
    if (error.status === 0) {
      errorMessage = 'Erro de conexão com o servidor';
    } else if (error.status >= 400 && error.status < 500) {
      errorMessage = error.error?.message || 'Requisição inválida';
    } else if (error.status >= 500) {
      errorMessage = 'Erro interno do servidor';
    }
    
    return throwError(() => new Error(errorMessage));
  }
}