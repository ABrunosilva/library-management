import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Dashboard cards -->
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Bem-vindo à Biblioteca</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <a routerLink="books" class="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Meus Livros</h2>
            <p class="text-gray-600">Gerencie os livros cadastrados por você.</p>
          </a>

          <a routerLink="books/new" class="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Cadastrar Novo Livro</h2>
            <p class="text-gray-600">Adicione títulos à sua coleção.</p>
          </a>

          

          <a routerLink="authors/new" class="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Autores</h2>
            <p class="text-gray-600">Gerencie os autores cadastrados.</p>
          </a>

          <a routerLink="profile" class="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Editar Perfil</h2>
            <p class="text-gray-600">Atualize suas informações de usuário.</p>
          </a>

          <a routerLink="logs" class="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
    <h2 class="text-xl font-semibold text-gray-700 mb-2">Logs do Sistema</h2>
    <p class="text-gray-600">Visualize as inclusões, edições e exclusões realizadas.</p>
  </a>

  <a routerLink="books/by-author" class="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
  <h2 class="text-xl font-semibold text-gray-700 mb-2">Livros por Autor</h2>
  <p class="text-gray-600">Veja os livros agrupados por seus autores.</p>
</a>



        </div>

        <!-- Aqui o conteúdo das rotas filhas será renderizado -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class HomeComponent {}
