import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service'; // Import BookService
import { Router } from '@angular/router';
import { Author } from '../../models/author.model';

@Component({
  standalone: true,
  selector: 'app-author-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-10">

      <h2 class="text-2xl font-bold mb-6 text-center">Cadastrar Autor</h2>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4 mb-8">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Autor</label>
          <input
            type="text"
            formControlName="name"
            class="app-input"
            placeholder="Ex: Clarice Lispector"
            [class.border-red-500]="form.get('name')?.invalid && form.get('name')?.touched"
          />
          <div *ngIf="form.get('name')?.errors?.['required'] && form.get('name')?.touched"
               class="text-red-500 text-sm mt-1">
            Nome é obrigatório.
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
          <input
            type="text"
            formControlName="nationality"
            class="app-input"
            placeholder="Ex: Brasileira"
          />
        </div>

        <div class="flex justify-end space-x-2">
          <button type="submit" [disabled]="form.invalid || loading" class="app-button-primary">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
          <button type="button" (click)="cancelEdit()" *ngIf="isEditing" class="app-button-secondary">
            Cancelar
          </button>
        </div>
      </form>

      <h3 class="text-xl font-semibold mb-4">Autores cadastrados</h3>

      <ul *ngIf="authors.length; else noAuthors" class="space-y-2">
        <li *ngFor="let author of authors" class="border rounded p-3 shadow-sm flex justify-between items-center">
          <div>
            <strong>{{ author.name }}</strong><br />
            <small class="text-gray-600">Nacionalidade: {{ author.nationality || 'Não informada' }}</small>
          </div>
          <div class="space-x-2">
            <button (click)="editAuthor(author)" class="app-button-secondary text-blue-600 hover:text-blue-800">Editar</button>
            <button (click)="deleteAuthor(author)" class="app-button-danger">Excluir</button>
          </div>
        </li>
      </ul>

      <ng-template #noAuthors>
        <p class="text-gray-500">Nenhum autor cadastrado ainda.</p>
      </ng-template>

      <div *ngIf="error" class="text-red-600 mt-4">
        Erro: {{ error }}
      </div>

    </div>
  `
})
export class AuthorFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  authors: Author[] = [];
  error = '';
  isEditing = false;
  editingAuthorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private bookService: BookService, // Injetar BookService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nationality: ['']
    });
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAll().subscribe({
      next: (data) => {
        this.authors = data;
        this.error = '';
      },
      error: (err) => {
        this.error = err.message || 'Erro na comunicação com o servidor.';
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    if (this.isEditing && this.editingAuthorId != null) {
      this.authorService.update(this.editingAuthorId, this.form.value).subscribe({
        next: () => {
          this.loading = false;
          this.resetForm();
          this.loadAuthors();
        },
        error: () => {
          this.loading = false;
          alert('Erro ao atualizar o autor.');
        }
      });
    } else {
      this.authorService.create(this.form.value).subscribe({
        next: () => {
          this.loading = false;
          this.resetForm();
          this.loadAuthors();
        },
        error: () => {
          this.loading = false;
          alert('Erro ao criar o autor.');
        }
      });
    }
  }

  editAuthor(author: Author) {
    this.isEditing = true;
    this.editingAuthorId = author.id!;
    this.form.setValue({
      name: author.name,
      nationality: author.nationality || ''
    });
  }

  deleteAuthor(author: Author) {
    // Verificar se autor tem livros antes de excluir
    this.bookService.getByAuthorId(author.id!).subscribe({
      next: (books) => {
        if (books.length > 0) {
          alert('Não é possível excluir este autor pois ele possui livros cadastrados.');
        } else {
          if (confirm(`Confirma a exclusão do autor "${author.name}"?`)) {
            this.authorService.delete(author.id!).subscribe({
              next: () => this.loadAuthors(),
              error: () => alert('Erro ao excluir o autor.')
            });
          }
        }
      },
      error: () => alert('Erro ao verificar livros do autor.')
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.isEditing = false;
    this.editingAuthorId = null;
    this.form.reset();
  }
}
