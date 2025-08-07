import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Villa } from '../models/villa.model';
import { environment } from '../../environments/environment'; // <-- ✅ Import environment

@Injectable({
  providedIn: 'root'
})
export class VillaService {
  private apiUrl = `${environment.apiBaseUrl}/api/v1`; // ✅ Use environment-based URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Get all villas
  getAllVillas(): Observable<Villa[]> {
    return this.http.get<Villa[]>(`${this.apiUrl}/get-all`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Get villa by ID
  getVillaById(id: string): Observable<Villa> {
    return this.http.get<Villa>(`${this.apiUrl}/get/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Add new villa
  addVilla(villa: Villa): Observable<Villa> {
    return this.http.post<Villa>(`${this.apiUrl}/add-villa-details`, villa, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Update villa
  updateVilla(id: string, villa: Villa): Observable<Villa> {
    return this.http.put<Villa>(`${this.apiUrl}/update/${id}`, villa, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Delete villa
  deleteVilla(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
