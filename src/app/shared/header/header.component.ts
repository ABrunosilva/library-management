import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <a
        routerLink="/home/books"
        class="text-xl font-bold text-blue-600 hover:text-blue-800"
        routerLinkActive="font-semibold text-blue-600"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        Minha Biblioteca
      </a>

      <nav class="space-x-4 text-gray-700">
        <a
          routerLink="/home/books"
          routerLinkActive="font-semibold text-blue-600"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Livros
        </a>

        <a
          routerLink="/home/authors/new"
          routerLinkActive="font-semibold text-blue-600"
        >
          Cadastrar Autor
        </a>

        <a
          routerLink="/home/profile"
          routerLinkActive="font-semibold text-blue-600"
        >
          Perfil
        </a>

        <button (click)="logout()" class="ml-4 text-red-600 hover:text-red-800 font-semibold">
          Sair
        </button>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
