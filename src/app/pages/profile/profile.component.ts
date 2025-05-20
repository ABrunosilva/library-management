import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow overflow-hidden max-w-2xl mx-auto">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium text-gray-900">Meu Perfil</h3>
      </div>
      
      <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form #profileForm="ngForm" (ngSubmit)="onSubmit(profileForm)">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              [(ngModel)]="user.email"
              name="email"
              class="app-input"
              readonly
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Nova Senha</label>
            <input
              type="password"
              [(ngModel)]="user.password"
              name="password"
              class="app-input"
              minlength="6"
              #password="ngModel"
            >
            <div *ngIf="password.invalid && password.touched" class="text-red-500 text-sm mt-1">
              A senha deve ter pelo menos 6 caracteres.
            </div>
          </div>

          <button 
            type="submit" 
            class="app-button-primary"
            [disabled]="profileForm.invalid || isSubmitting"
          >
            {{ isSubmitting ? 'Atualizando...' : 'Atualizar Perfil' }}
          </button>

          <div *ngIf="successMessage" class="text-green-600 mt-3">
            {{ successMessage }}
          </div>
          <div *ngIf="errorMessage" class="text-red-600 mt-3">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProfileComponent {
  user = { email: '', password: '' };
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {
    this.loadUser();
  }

  loadUser() {
    const userData = this.authService.getUser();
    if (userData) {
      this.user.email = userData.email;
    }
  }

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) return;

    if (!this.user.password) {
      this.errorMessage = 'Por favor, insira uma nova senha para atualizar.';
      return;
    }

    const userData = this.authService.getUser();
    if (!userData) {
      this.errorMessage = 'Usuário não autenticado.';
      return;
    }

    this.isSubmitting = true;

    this.authService.updatePassword(userData.userId, this.user.password).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Perfil atualizado com sucesso!';
        this.user.password = ''; // limpa o campo senha
        form.resetForm({ email: this.user.email }); // mantém o email preenchido e reseta a senha
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.message || 'Erro ao atualizar perfil.';
      }
    });
  }
}
