import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginData } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = false;
  private authenticatedSubject = new Subject<boolean>();
  private accessToken: string = '';
  private refreshToken: string = '';
  private expiresIn: number = 0;

  constructor(private http: HttpClient) {
    this.authenticatedSubject.next(false);
  }

  login(data: LoginData): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, data);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.authenticated = false;
    this.authenticatedSubject.next(false);
  }

  signup(data: LoginData): Observable<any> {
    return this.http.post<any>(`${environment.api}/trainers`, data);
  }

  IsAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticatedSubject(authenticated: boolean): void {
    this.authenticatedSubject.next(authenticated);
  }

  getAuthenticatedSubject(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
    this.authenticated = true;
    this.authenticatedSubject.next(true);
  }

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
  }

  setExpiresIn(expiresIn: number): void {
    this.expiresIn = expiresIn;
  }

  autoLogin(): void {
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      this.setAccessToken(accessToken);
    }
  }
}
