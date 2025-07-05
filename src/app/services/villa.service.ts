import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Villa } from '../models/villa.model'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class VillaService {
  private apiUrl = 'http://localhost:8080/api/v1/'; // your backend base URL

  constructor(private http: HttpClient) {}

  // Get all villas
  getAllVillas(): Observable<Villa[]> {
    return this.http.get<Villa[]>(`${this.apiUrl}get-all`);
  }

  // Get villa by ID
  getVillaById(id: string): Observable<Villa> {
    return this.http.get<Villa>(`${this.apiUrl}/${id}`);
  }

  // Add new villa
  addVilla(villa: Villa): Observable<Villa> {
    return this.http.post<Villa>(this.apiUrl, villa);
  }

  // Update villa
  updateVilla(id: string, villa: Villa): Observable<Villa> {
    return this.http.put<Villa>(`${this.apiUrl}/${id}`, villa);
  }

  // ✅ Delete villa
  deleteVilla(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
export type { Villa };

