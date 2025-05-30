import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model'; // Add Book import

@Component({
  standalone: true,
  selector: 'app-author-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- template remains unchanged -->
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
    private bookService: BookService,
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
    // Fix: Added type for books parameter
    this.bookService.getByAuthorId(author.id!).subscribe({
      next: (books: Book[]) => {
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