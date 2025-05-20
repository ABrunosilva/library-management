import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold text-center mb-6">Entrar na sua conta</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            formControlName="email"
            placeholder="Digite seu e-mail"
            class="app-input"
            [class.border-red-500]="form.get('email')?.invalid && form.get('email')?.touched"
          />
          <div *ngIf="form.get('email')?.touched && form.get('email')?.invalid" class="text-red-500 text-sm mt-1">
            E-mail válido é obrigatório.
          </div>

          <label class="block text-sm font-medium mt-4 mb-1">Senha</label>
          <input
            type="password"
            formControlName="password"
            placeholder="Digite sua senha"
            class="app-input"
            [class.border-red-500]="form.get('password')?.invalid && form.get('password')?.touched"
          />
          <div *ngIf="form.get('password')?.touched && form.get('password')?.invalid" class="text-red-500 text-sm mt-1">
            Senha é obrigatória.
          </div>

          <button
            type="submit"
            [disabled]="form.invalid || isSubmitting"
            class="app-button-primary w-full mt-6"
          >
            {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
          </button>

          <div *ngIf="errorMessage" class="bg-red-100 text-red-700 px-4 py-2 mt-4 rounded text-center text-sm">
            {{ errorMessage }}
          </div>

          <div class="text-center text-sm mt-6">
            Não tem uma conta?
            <a routerLink="/register" class="text-blue-600 hover:underline">Cadastre-se</a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  form: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => {
        this.errorMessage = err.message;
        this.isSubmitting = false;
      }
    });
  }
}
