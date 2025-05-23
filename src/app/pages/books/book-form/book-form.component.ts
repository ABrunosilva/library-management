import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-xl mx-auto py-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        {{ isEditMode ? 'Editar Livro' : 'Adicionar Novo Livro' }}
      </h1>

      <div *ngIf="errorMessage" class="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
        {{ errorMessage }}
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white p-6 rounded shadow space-y-6">
        <div>
          <label class="block text-sm font-medium mb-1">Título do Livro</label>
          <input
            formControlName="title"
            class="app-input"
            placeholder="Ex: Dom Casmurro"
            [class.border-red-500]="form.get('title')?.invalid && form.get('title')?.touched"
          />
          <div *ngIf="form.get('title')?.errors?.['required'] && form.get('title')?.touched"
               class="text-red-500 text-sm mt-1">
            Título é obrigatório.
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Autor</label>
          <input
            formControlName="author"
            class="app-input"
            placeholder="Ex: Machado de Assis"
            [class.border-red-500]="form.get('author')?.invalid && form.get('author')?.touched"
          />
          <div *ngIf="form.get('author')?.errors?.['required'] && form.get('author')?.touched"
               class="text-red-500 text-sm mt-1">
            Autor é obrigatório.
          </div>
        </div>

        <div class="flex justify-end gap-4">
          <a routerLink="/home/books" class="app-button-secondary">Cancelar</a>
          <button type="submit" [disabled]="form.invalid || isSubmitting" class="app-button-primary">
            {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class BookFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.getUserId();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadBook(Number(id));
    }
  }

  private getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.userId;
    }
  }

  private loadBook(id: number) {
    this.isSubmitting = true;
    this.bookService.getById(id).subscribe({
      next: (book) => {
        this.form.patchValue(book);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar livro: ' + err.message;
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/home/books']), 2000);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const bookData = {
      ...this.form.value,
      userId: this.userId
    };

    const request = this.isEditMode
      ? this.bookService.update(Number(this.route.snapshot.params['id']), bookData)
      : this.bookService.create(bookData);

    request.subscribe({
      next: () => this.router.navigate(['/home/books']),
      error: (err) => {
        this.errorMessage = 'Erro: ' + err.message;
        this.isSubmitting = false;
      }
    });
  }
}