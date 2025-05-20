// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      // Rota de redirecionamento DEVE vir por último
      { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'books', loadComponent: () => import('./pages/books/books.component').then(m => m.BooksComponent) },
      { path: 'books/edit/:id', loadComponent: () => import('./pages/books/book-form/book-form.component').then(m => m.BookFormComponent) },
      { path: 'books/new', loadComponent: () => import('./pages/books/book-form/book-form.component').then(m => m.BookFormComponent) },
      { path: '', redirectTo: 'books', pathMatch: 'full' } // ← Corrigido: movido para o final
    ]
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];