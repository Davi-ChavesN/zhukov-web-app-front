import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SafePipe } from '../../pipes/safe.pipe';
import { AuthService } from '../../services/auth/auth.service';
import { Media, MediaService, UpdateMedia } from '../../services/media/media.service';
import { Review, ReviewService } from '../../services/review/review.service';
import { UserService } from '../../services/user/user.service';
import { FooterComponent } from "../footer/footer.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ReviewModalComponent } from "../review-modal/review-modal.component";

@Component({
    selector: 'app-media-view-page',
    imports: [NavBarComponent, CommonModule, FooterComponent, FormsModule, ReviewModalComponent, SafePipe],
    templateUrl: './media-view-page.component.html',
    styleUrl: './media-view-page.component.scss'
})
export class MediaViewPageComponent implements OnInit {

    mediaId!: string;
    media!: Media;
    reviewsList: Review[] = [];
    newReview: Review = {
        userId: '',
        mediaId: '',
        score: 0,
        comment: '',
    }
    updateMedia!: UpdateMedia;
    userNicknames: { [userId: string]: string } = {};

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private reviewService: ReviewService,
        private userService: UserService,
        readonly authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.mediaId = this.route.snapshot.paramMap.get('id')!;

        this.mediaService.getMediaById(this.mediaId).subscribe((data) => {
            this.media = data as Media;

            this.reviewService.getAllMediaReviews(this.mediaId).subscribe((data) => {
                this.reviewsList = data as Review[];

                if (this.reviewsList.length > 0) {
                    this.media.score = 0;
                    for (const review of this.reviewsList) {
                        this.media.score += review.score;
                    }
                    this.media.score = this.media.score / this.reviewsList.length
                }
            });
        });


    }

    goToEditPage(id: string) {
        this.router.navigate(['media-edit', id]);
    }

    refreshReviews() {
        this.reviewService.getAllMediaReviews(this.mediaId).subscribe((reviews) => {
            this.reviewsList = reviews;

            if (this.reviewsList.length > 0) {
                this.media.score = 0;
                for (const review of this.reviewsList) {
                    this.media.score += review.score;
                }
                this.media.score = this.media.score / this.reviewsList.length
                this.mediaService.mediaUpdate(this.media.id, this.updateMedia = {
                    id: this.media.id,
                    title: this.media.title,
                    description: this.media.description,
                    director: this.media.director,
                    releaseYear: this.media.releaseYear,
                    duration: this.media.duration,
                    producer: this.media.producer,
                    score: this.media.score,
                    posterUrl: this.media.posterUrl,
                    bannerUrl: this.media.bannerUrl,
                    trailerUrl: this.media.trailerUrl,
                    genreIds: this.media.genreIds,
                });
            }
        });
    }

    getUserNickname(userId: string) {
        if (this.userNicknames[userId]) {
            return this.userNicknames[userId];
        } else {
            this.userService.getUserById(userId).subscribe({
                next: (user) => {
                    this.userNicknames[userId] = user.nickname;
                },
                error: (err) => {
                    console.error(`Erro ao buscar nickname do usuário ${userId}:`, err);
                    this.userNicknames[userId] = 'Desconhecido';
                }
            });

            // Return a fallback value while the real one loads
            return 'Carregando...';
        }
    }

    goToUserProfile(userId: string) {
        this.router.navigate(['user', userId]);
    }

    getYoutubeEmbedUrl(): string {
        if (!this.media?.trailerUrl) return '';

        const videoId = this.media.trailerUrl.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

}
