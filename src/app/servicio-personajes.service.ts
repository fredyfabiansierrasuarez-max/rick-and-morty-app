import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface ApiResponse {
  info: any;
  results: Personaje[];
}

@Injectable({ providedIn: 'root' })
export class ServicioPersonajes {
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  obtenerPersonajes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL);
  }

  getCharacters(name?: string, status?: string): Observable<ApiResponse> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<ApiResponse>(this.API_URL, { params });
  }
}
