// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-header></app-header>
      
      <div class="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <!-- Sidebar -->
        <nav class="hidden md:block w-64 bg-white rounded-lg shadow p-4 sticky top-20 h-fit">
          <ul class="space-y-3 text-gray-700 font-medium">
            <li><a routerLink="/home" routerLinkActive="text-blue-600 font-semibold" class="hover:text-blue-600 cursor-pointer">Dashboard</a></li>
            <li><a routerLink="/home/books" routerLinkActive="text-blue-600 font-semibold" class="hover:text-blue-600 cursor-pointer">Meus Livros</a></li>
            <li><a routerLink="/profile" routerLinkActive="text-blue-600 font-semibold" class="hover:text-blue-600 cursor-pointer">Perfil</a></li>
            <li><a routerLink="/settings" routerLinkActive="text-blue-600 font-semibold" class="hover:text-blue-600 cursor-pointer">Configurações</a></li>
          </ul>
        </nav>

        <!-- Conteúdo principal -->
        <main class="flex-1 bg-white rounded-lg shadow p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    /* para evitar que sidebar fique muito grande no scroll vertical */
    nav {
      max-height: calc(100vh - 5rem); /* ajuste conforme header */
      overflow-y: auto;
    }
  `]
})
export class HomeComponent {}
