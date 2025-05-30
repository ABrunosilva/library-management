import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { AuthService } from '../../../services/auth.service';
import { Book } from '../../../models/book.model';
import { Author } from '../../../models/author.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';
  userId!: number;
  authors: Author[] = [];

  ngOnInit() {
    // Get user ID from token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userId = payload.userId;
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }

    // Initialize form
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      authorId: [null, Validators.required]
    });

    // Load authors
    this.authorService.getAll().subscribe({
      next: authors => this.authors = authors,
      error: err => this.errorMessage = 'Erro ao carregar autores: ' + err.message
    });

    // Check edit mode
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bookService.getById(+id).subscribe({
        next: book => {
          this.form.patchValue({
            title: book.title,
            authorId: book.authorId
          });
        },
        error: err => this.errorMessage = 'Erro ao carregar livro: ' + err.message
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.form.value;
    const bookData = {
      title: formValue.title,
      authorId: +formValue.authorId,
      userId: this.userId
    };

    if (this.isEditMode) {
      const id = +this.route.snapshot.params['id'];
      this.updateBook(id, bookData);
    } else {
      this.createBook(bookData);
    }
  }

  createBook(bookData: Omit<Book, 'id'>) {
    this.bookService.create(bookData).subscribe({
      next: () => {
        this.router.navigate(['/home/books']);
        this.isSubmitting = false;
      },
      error: err => {
        this.errorMessage = 'Erro: ' + (err.error?.message || err.message || 'Unknown error');
        this.isSubmitting = false;
      }
    });
  }

  updateBook(id: number, bookData: Partial<Book>) {
    this.bookService.update(id, bookData).subscribe({
      next: () => {
        this.router.navigate(['/home/books']);
        this.isSubmitting = false;
      },
      error: err => {
        this.errorMessage = 'Erro: ' + (err.error?.message || err.message || 'Unknown error');
        this.isSubmitting = false;
      }
    });
  }
}