import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Your backend URL

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
}


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
