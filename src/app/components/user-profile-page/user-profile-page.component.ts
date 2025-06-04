import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MediaService } from '../../services/media/media.service';
import { Review, ReviewService } from '../../services/review/review.service';
import { User, UserService } from '../../services/user/user.service';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
    selector: 'app-user-profile-page',
    imports: [NavBarComponent, CommonModule, FooterComponent],
    templateUrl: './user-profile-page.component.html',
    styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {
    userId: string = '';
    user!: User;
    userReviews: Review[] = [];
    mediaTitles: { [mediaId: string]: string } = {};

    constructor(
        readonly authService: AuthService,
        private reviewService: ReviewService,
        private mediaService: MediaService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id')!;

        this.userService.getUserById(this.userId).subscribe({
            next: (user) => {
                this.user = user;

                if (this.user) {
                    this.reviewService.getAllUserReviews(this.user.id).subscribe({
                        next: (reviews) => {
                            this.userReviews = reviews;
                        },
                        error: (err) => {
                            console.error('Erro ao buscar avaliações do usuário:', err);
                        }
                    });
                }
            },
            error: (err) => {
                console.error('Erro ao buscar dados do usuário: ', err);
            }
        })
    }

    getMediaTitle(mediaId: string) {
        if (this.mediaTitles[mediaId]) {
            return this.mediaTitles[mediaId];
        } else {
            this.mediaService.getMediaById(mediaId).subscribe({
                next: (media) => {
                    this.mediaTitles[mediaId] = media.title;
                },
                error: (err) => {
                    console.error(`Erro ao buscar título da mídia ${mediaId}:`, err);
                    this.mediaTitles[mediaId] = 'Desconhecido';
                }
            });

            // Return a fallback value while the real one loads
            return 'Carregando...';
        }
    }

    goToMediaView(id: string) {
        this.router.navigate(['/media', id]);
    }
}
