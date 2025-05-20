import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) { }

  getAllReviews() {
    return this.http.get<Review[]>(`${this.apiUrl}/all`)
  }

  getAllMediaReviews(mediaId: string) {
    return this.http.get<Review[]>(`${this.apiUrl}/all/media/${mediaId}`)
  }
}

export interface Review {
  userId: string;
  mediaId: string;
  score: number;
  comment?: string | null;
}
