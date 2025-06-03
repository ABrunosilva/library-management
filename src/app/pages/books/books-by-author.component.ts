// src/app/pages/books/books-by-author.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBooks, selectAuthors, selectBooksLoading } from './store/books.selectors';
import { Book } from '../../models/book.model';
import { Author } from '../../models/author.model';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import * as BookActions from './store/books.actions';
import { AuthorService } from '../../services/author.service';



@Component({
  selector: 'app-books-by-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-by-author.component.html'
})
export class BooksByAuthorComponent implements OnInit {
  private store = inject(Store);

  authorsWithBooks$!: Observable<{ author: Author; books: Book[] }[]>;
  loading$ = this.store.select(selectBooksLoading);

  ngOnInit(): void {
    // Dispatch actions to load necessary data
    this.store.dispatch(BookActions.loadBooks());
    this.store.dispatch(BookActions.loadAuthors());
    
    // Create the authors with books observable
    this.authorsWithBooks$ = combineLatest([
      this.store.select(selectAuthors),
      this.store.select(selectBooks)
    ]).pipe(
      map(([authors, books]) => 
        authors.map(author => ({
          author,
          books: books.filter(book => book.authorId === author.id)
        }))
      )
    );
  }
}