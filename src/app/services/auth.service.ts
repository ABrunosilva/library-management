// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private authSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthState();
  }

  private checkAuthState() {
    const token = localStorage.getItem('token');
    this.authSubject.next(!!token);
  }

  getUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    return JSON.parse(userJson);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ accessToken: string; user: any }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.authSubject.next(true);
        this.router.navigate(['/home']);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Falha ao efetuar login'));
      })
    );
  }

  // Novo método register para cadastro
  register(user: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Erro no registro:', error);
        return throwError(() => new Error('Falha no registro'));
      })
    );
  }

  updatePassword(userId: string, newPassword: string) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/users/${userId}/password`, { password: newPassword }, { headers }).pipe(
      tap(() => {
        const user = this.getUser();
        if (user) {
          user.password = '';
          localStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError(error => {
        console.error('Erro ao atualizar senha:', error);
        return throwError(() => new Error('Falha ao atualizar a senha'));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSubject.next(false);
    this.router.navigate(['/login']);
  }
}
