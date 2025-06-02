import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiUrl = `${environment.apiUrl}/review`;

    constructor(private http: HttpClient) { }

    reviewRegister(review: Review) {
        return this.http.post<Review>(`${this.apiUrl}/register`, review);
    }

    getAllReviews() {
        return this.http.get<Review[]>(`${this.apiUrl}/all`)
    }

    getAllMediaReviews(mediaId: string) {
        return this.http.get<Review[]>(`${this.apiUrl}/all/media/${mediaId}`)
    }

    getAllUserReviews(userId: string) {
        return this.http.get<Review[]>(`${this.apiUrl}/all/user/${userId}`);
    }

    getReviewById(userId: string, mediaId: string) {
        return this.http.get<Review>(`${this.apiUrl}/${userId}/${mediaId}`);
    }

    updateReview(review: Review) {
        return this.http.put<Review>(`${this.apiUrl}/update/${review.userId}/${review.mediaId}`, review);
    }
}

export interface Review {
    userId: string;
    mediaId: string;
    score: number;
    comment?: string | null;
}
