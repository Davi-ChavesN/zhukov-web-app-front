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

    mediaRegister(media: CreateMedia): Observable<Media> {
        return this.http.post<Media>(`${this.apiUrl}/register`, media);
    }

    getAllMedias(): Observable<Media[]> {
        return this.http.get<Media[]>(`${this.apiUrl}/all`);
    }

    getMediaById(id: string): Observable<Media> {
        return this.http.get<Media>(`${this.apiUrl}/${id}`);
    }

    mediaUpdate(id:string, media: UpdateMedia) {
        return this.http.patch<Media>(`${this.apiUrl}/update/${id}`, media);
    }
}

export interface CreateMedia {
    title: string;
    description: string;
    director: string;
    releaseYear: number;
    duration: number;
    producer: string;
    score: number;
    posterUrl: string;
    bannerUrl: string;
    trailerUrl: string;
    genreIds: string[];
}

export interface UpdateMedia {
    id: string;
    title?: string;
    description?: string;
    director?: string;
    releaseYear?: number;
    duration?: number;
    producer?: string;
    score?: number;
    posterUrl?: string;
    bannerUrl?: string;
    trailerUrl?: string;
    genreIds?: string[];
}

export interface Media extends CreateMedia {
    id: string;
    mediaGenres: string[];
}
