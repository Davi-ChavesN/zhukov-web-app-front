import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiUrl = `${environment.apiUrl}/genre`;
  
    constructor(private http: HttpClient) { }

    genreRegister(genre: CreateGenre): Observable<Genre> {
      return this.http.post<Genre>(`${this.apiUrl}/register`, genre);
    }
  
    getAllMedias(): Observable<Genre[]> {
      return this.http.get<Genre[]>(`${this.apiUrl}/all`);
    }
}

export interface CreateGenre {
  description: string;
}

export interface Genre extends CreateGenre {
  id: string; 
}
