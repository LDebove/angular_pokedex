import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';
import { LoginData } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private accessToken: string = '';
  private refreshToken: string = '';
  private expiresIn: number = 0;

  constructor(private http: HttpClient) { }

  login(data: LoginData): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, data);
  }

  signup(data: LoginData): Observable<any> {
    return this.http.post<any>(`${environment.api}/trainers`, data);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    this.isAuthenticated = true;
  }

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
  }

  setExpiresIn(expiresIn: number): void {
    this.expiresIn = expiresIn;
    setTimeout(() => {
      this.isAuthenticated = false;
      this
    }, expiresIn);
  }
}
