import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from '../../models/author.model';

@Component({
  standalone: true,
  selector: 'app-author-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './author-form.component.html'
})
export class AuthorFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authorService = inject(AuthorService);
  private route = inject(ActivatedRoute);
  
  // Make router public to access in template
  router = inject(Router);

  form!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';
  authorId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      nationality: ['']
    });

    if (id) {
      this.isEditMode = true;
      this.authorId = +id;
      this.loadAuthor(this.authorId);
    }
  }

  loadAuthor(id: number) {
    this.isSubmitting = true;
    this.authorService.getById(id).subscribe({
      next: (author) => {
        this.form.patchValue({
          name: author.name,
          nationality: author.nationality || ''
        });
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar autor: ' + (err.message || 'Unknown error');
        this.isSubmitting = false;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const authorData = this.form.value;

    if (this.isEditMode && this.authorId) {
      this.authorService.update(this.authorId, authorData).subscribe({
        next: () => {
          this.router.navigate(['/home/authors']);
          this.isSubmitting = false;
        },
        error: (err) => {
          this.errorMessage = 'Erro: ' + (err.error?.message || err.message || 'Unknown error');
          this.isSubmitting = false;
        }
      });
    } else {
      this.authorService.create(authorData).subscribe({
        next: () => {
          this.router.navigate(['/home/authors']);
          this.isSubmitting = false;
        },
        error: (err) => {
          this.errorMessage = 'Erro: ' + (err.error?.message || err.message || 'Unknown error');
          this.isSubmitting = false;
        }
      });
    }
  }

  // Add public method to handle navigation
  navigateToAuthors() {
    this.router.navigate(['/home/authors']);
  }
}