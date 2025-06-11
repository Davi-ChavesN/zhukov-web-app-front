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
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-media-view-page',
    imports: [NavBarComponent, CommonModule, FooterComponent, FormsModule, ReviewModalComponent, SafePipe],
    templateUrl: './media-view-page.component.html',
    styleUrl: './media-view-page.component.scss'
})
export class MediaViewPageComponent implements OnInit {

    mediaId!: string;
    media: Media | null = null;
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
        private readonly route: ActivatedRoute,
        private readonly mediaService: MediaService,
        private readonly reviewService: ReviewService,
        private readonly userService: UserService,
        readonly authService: AuthService,
        private readonly router: Router,
        private readonly toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.mediaId = this.route.snapshot.paramMap.get('id')!;

        this.mediaService.getMediaById(this.mediaId).subscribe((data) => {
            this.media = data as Media;
        });

        this.reviewService.getAllMediaReviews(this.mediaId).subscribe((data) => {
            this.reviewsList = data as Review[];
        });
    }

    goToEditPage(id: string) {
        this.router.navigate(['media-edit', id]);
    }

    refreshReviews() {
        this.reviewService.getAllMediaReviews(this.mediaId).subscribe((reviews) => {
            this.reviewsList = reviews;

            if (!this.media) {
                return;
            }

            if (this.reviewsList.length > 0) {
                this.media.score = 0;
                for (const review of this.reviewsList) {
                    this.media.score += review.score;
                }
                this.media.score = this.media.score / this.reviewsList.length;

                this.updateMedia = {
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
                };

                this.mediaService.mediaUpdate(this.media.id, this.updateMedia).subscribe({
                    next: (response) => {
                    },
                    error: (err) => {
                        console.error(err);
                    }
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
                    if (user.status === 'active') {
                        this.userNicknames[userId] = user.nickname;
                    } else {
                        this.userNicknames[userId] = 'Usuário Desativado'
                    }
                },
                error: (err) => {
                    console.error(`Erro ao buscar nickname do usuário ${userId}:`, err);
                    this.userNicknames[userId] = 'Desconhecido';
                }
            });

            return 'Carregando...';
        }
    }

    goToUserProfile(userId: string) {
        this.userService.getUserById(userId).subscribe({
            next: (user) => {
                if (user.status === 'active') {
                    this.router.navigate(['user', userId]);
                } else {
                    this.toastr.warning("Perfil indisponível");
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    getYoutubeEmbedUrl(): string {
        if (!this.media?.trailerUrl) return '';

        const videoId = this.media.trailerUrl.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

}
