import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(books => books.map(book => ({
        id: book.id,
        title: book.title,
        authorId: Number(book.authorId),  // Fixed: Removed extra )
        userId: book.userId ? Number(book.userId) : undefined
      })))
    );
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      map(book => ({
        ...book,
        authorId: Number(book.authorId),  // Fixed: Removed extra )
        userId: book.userId ? Number(book.userId) : undefined
      }))
    );
  }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    // Ensure authorId is number
    const payload = {
      ...book,
      authorId: Number(book.authorId),  // Fixed: Removed extra )
      userId: book.userId ? Number(book.userId) : undefined
    };
    return this.http.post<Book>(this.apiUrl, payload);
  }

  update(id: number, book: Partial<Book>): Observable<Book> {
    // Ensure authorId is number
    const payload = {
      ...book,
      authorId: book.authorId ? Number(book.authorId) : undefined,
      userId: book.userId ? Number(book.userId) : undefined
    };
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByAuthorId(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?authorId=${authorId}`).pipe(
      map(books => books.map(book => ({
        ...book,
        authorId: Number(book.authorId),  // Fixed: Removed extra )
        userId: book.userId ? Number(book.userId) : undefined
      }))
    ));
  }
}