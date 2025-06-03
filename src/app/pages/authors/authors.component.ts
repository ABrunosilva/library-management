import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Autores</h1>
        <a routerLink="/home/authors/new" class="app-button-primary">Novo Autor</a>
      </div>

      <div *ngIf="loading" class="text-center py-4">
        <div class="spinner"></div>
        <p>Carregando autores...</p>
      </div>

      <div *ngIf="error" class="bg-red-100 text-red-700 p-4 rounded mb-4">
        {{ error }}
      </div>

      <table *ngIf="authors.length" class="w-full table-auto bg-white shadow rounded">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="text-left px-4 py-2">Nome</th>
            <th class="text-left px-4 py-2">Nacionalidade</th>
            <th class="text-left px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let author of authors" class="border-t">
            <td class="px-4 py-2">{{ author.name }}</td>
            <td class="px-4 py-2">{{ author.nationality || '-' }}</td>
            <td class="px-4 py-2 flex gap-2">
              <a [routerLink]="['/home/authors/edit', author.id]" class="app-button-secondary">Editar</a>
              <button (click)="deleteAuthor(author.id)" class="app-button-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!loading && !authors.length" class="text-center py-8">
        <p class="text-gray-500">Nenhum autor cadastrado ainda.</p>
        <a routerLink="/home/authors/new" class="app-button-primary mt-4 inline-block">Adicionar Autor</a>
      </div>
    </div>
  `
})
export class AuthorsComponent {
  private authorService = inject(AuthorService);
  private router = inject(Router);

  authors: Author[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.loading = true;
    this.authorService.getAll().subscribe({
      next: (authors) => {
        this.authors = authors;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar autores: ' + (err.message || 'Unknown error');
        this.loading = false;
      }
    });
  }

  deleteAuthor(id: number | undefined) {
    if (id === undefined) {
      console.error('Cannot delete author without ID');
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.authorService.delete(id).subscribe({
        next: () => {
          this.authors = this.authors.filter(a => a.id !== id);
        },
        error: (err) => {
          this.error = 'Erro ao excluir autor: ' + (err.message || 'Unknown error');
        }
      });
    }
  }
}