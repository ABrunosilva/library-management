import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, Observable, throwError } from 'rxjs';

interface Book {
  id?: number;
  title: string;
  authorId: number;  // id do autor
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  private get authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nenhum token de autenticação encontrado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  // Novo método para pegar livros por autor
  getByAuthorId(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?authorId=${authorId}`, { headers: this.authHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, { headers: this.authHeaders }).pipe(
      tap(() => console.log('Livro criado com sucesso:', book)),
      catchError(this.handleError)
    );
  }

  update(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book, { headers: this.authHeaders }).pipe(
      tap(() => console.log('Livro atualizado:', id, book)),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.authHeaders }).pipe(
      tap(() => console.log('Livro excluído:', id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;

      // Mensagens específicas para códigos de status comuns
      switch (error.status) {
        case 401:
          errorMessage = 'Acesso não autorizado. Faça login novamente.';
          break;
        case 404:
          errorMessage = 'Livro não encontrado.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
      }
    }

    console.error('Erro na operação:', error);
    return throwError(() => new Error(errorMessage));
  }
}
