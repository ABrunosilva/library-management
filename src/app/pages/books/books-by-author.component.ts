// src/app/pages/books/books-by-author.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBooks, selectAuthors } from './store/books.selectors';
import { Book } from '../../models/book.model';
import { Author } from '../../models/author.model';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-books-by-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-by-author.component.html'
})
export class BooksByAuthorComponent {
  private store = inject(Store);

  // Combine books and authors
  authorsWithBooks$ = combineLatest([
    this.store.select(selectAuthors),
    this.store.select(selectBooks)
  ]).pipe(
    map(([authors, books]) => 
      authors.map(author => ({
        ...author,
        books: books.filter(book => book.authorId === author.id)
      }))
    )
  );
}