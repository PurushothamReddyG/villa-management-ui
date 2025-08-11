import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  userName: string;
  email: string;
  mobileNumber?: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/auth/get-logged-in-user`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found in localStorage');
      // Return null observable to handle no-auth scenario gracefully
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<User>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching current user:', error);
        // Optionally return null or propagate error further
        return throwError(() => error);
      })
    );
  }
}
