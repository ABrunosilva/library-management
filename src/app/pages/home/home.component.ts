// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Bem-vindo à Biblioteca</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Meus Livros</h2>
            <p class="text-gray-600">Gerencie os livros cadastrados por você.</p>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Cadastrar Novo Livro</h2>
            <p class="text-gray-600">Adicione títulos à sua coleção.</p>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Editar Perfil</h2>
            <p class="text-gray-600">Atualize suas informações de usuário.</p>
          </div>
        </div>
      </main>
    </div>
  `
})
export class HomeComponent {}
