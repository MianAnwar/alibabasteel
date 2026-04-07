import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const TOKEN_KEY = 'abs-admin-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(TOKEN_KEY);
    }
    return false;
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', { username, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(TOKEN_KEY, response.token);
        }
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
