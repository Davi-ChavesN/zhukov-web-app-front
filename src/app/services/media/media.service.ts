import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = `${environment.apiUrl}/media`;

  constructor(private http: HttpClient) { }

  getAllMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/all`)
  }

  getMediaById(id: string): Observable<Media> {
    return this.http.get<Media>(`${this.apiUrl}/${id}`)
  }
}

export interface Media {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  duration: number;
  producer: string;
  rating: string;
  posterUrl: string;
  mediaGenres: string[];
}
