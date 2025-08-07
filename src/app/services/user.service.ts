import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; // ✅ Environment import

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/auth/get-logged-in-user`; // ✅ Dynamic URL

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<User>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error in UserService.getCurrentUser():', error);
        return throwError(() => error);
      })
    );
  }
}
