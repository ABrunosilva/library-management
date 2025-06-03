import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'http://localhost:3000';  // Changed to baseUrl

  constructor(private http: HttpClient) { }

  // All book endpoints
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`).pipe(  // Fixed endpoint
      map(books => books.map(book => ({
        ...book,
        authorId: Number(book.authorId)
      })))
    );
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`).pipe(  // Fixed endpoint
      map(book => ({
        ...book,
        authorId: Number(book.authorId),
        userId: book.userId ? Number(book.userId) : undefined
      }))
    );
  }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    const payload = {
      ...book,
      authorId: Number(book.authorId),
      userId: book.userId ? Number(book.userId) : undefined
    };
    return this.http.post<Book>(`${this.baseUrl}/books`, payload);  // Fixed endpoint
  }

  update(id: number, book: Partial<Book>): Observable<Book> {
    const payload = {
      ...book,
      authorId: book.authorId ? Number(book.authorId) : undefined,
      userId: book.userId ? Number(book.userId) : undefined
    };
    return this.http.patch<Book>(`${this.baseUrl}/books/${id}`, payload);  // Fixed endpoint
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/books/${id}`);  // Fixed endpoint
  }

  // Author endpoints
  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/authors`);  // Fixed endpoint
  }

  getByAuthorId(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books?authorId=${authorId}`).pipe(  // Fixed endpoint
      map(books => books.map(book => ({
        ...book,
        authorId: Number(book.authorId),
        userId: book.userId ? Number(book.userId) : undefined
      }))
    ));
  }
}