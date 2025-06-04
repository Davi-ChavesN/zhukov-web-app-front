import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Media, MediaService } from '../../services/media/media.service';
import { Review, ReviewService } from '../../services/review/review.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ReviewModalComponent } from "../review-modal/review-modal.component";
import { UserService } from '../../services/user/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-media-view-page',
    imports: [NavBarComponent, CommonModule, FooterComponent, FormsModule, ReviewModalComponent],
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
}
