import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto py-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Meus Livros</h1>

      <div class="mb-4 text-right">
        <a routerLink="/home/books/new" class="app-button-primary">+ Adicionar Livro</a>
      </div>

      <div *ngIf="errorMessage" class="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
        {{ errorMessage }}
      </div>

      <div *ngIf="books.length === 0" class="text-gray-500 text-center">
        Nenhum livro encontrado. Clique em "Adicionar Livro" para cadastrar.
      </div>

      <table *ngIf="books.length > 0" class="w-full table-auto bg-white shadow rounded">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="text-left px-4 py-3">Título</th>
            <th class="text-left px-4 py-3">Autor</th>
            <th class="text-right px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr *ngFor="let book of books" class="hover:bg-gray-50">
            <td class="px-4 py-3">{{ book.title }}</td>
            <td class="px-4 py-3">{{ book.author }}</td>
            <td class="px-4 py-3 text-right">
              <a
                [routerLink]="['/home/books/edit', book.id]"
                class="app-button-secondary mr-2"
              >
                Editar
              </a>
              <button
                (click)="deleteBook(book.id)"
                class="app-button-danger"
                [disabled]="isDeleting === book.id"
              >
                {{ isDeleting === book.id ? 'Excluindo...' : 'Excluir' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  errorMessage = '';
  isDeleting: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  private loadBooks() {
    this.bookService.getAll().subscribe({
      next: (books) => this.books = books,
      error: (err) => this.errorMessage = err.message
    });
  }

  deleteBook(id: number) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;

    this.isDeleting = id;
    this.bookService.delete(id).pipe(
      finalize(() => this.isDeleting = null)
    ).subscribe({
      next: () => this.books = this.books.filter(b => b.id !== id),
      error: (err) => this.errorMessage = err.message
    });
  }
}
