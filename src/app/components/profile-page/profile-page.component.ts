import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUser } from '../../services/auth/auth.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { Review, ReviewService } from '../../services/review/review.service';
import { MediaService } from '../../services/media/media.service';
import { Router } from '@angular/router';
import { UserEditModalComponent } from "../user-edit-modal/user-edit-modal.component";

@Component({
    selector: 'app-profile-page',
    imports: [NavBarComponent, CommonModule, FooterComponent, UserEditModalComponent],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
    user!: LoggedUser;
    userReviews: Review[] = [];
    mediaTitles: { [mediaId: string]: string } = {};

    constructor(
        readonly authService: AuthService,
        private reviewService: ReviewService,
        private mediaService: MediaService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            const userData = this.authService.getLoggedUser();
            console.log(userData?.birthDate);

            this.user = userData!;

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
        }
    }

    editProfile() {
        // Navega para página de edição ou abre modal
        console.log('Editar perfil');
    }

    refreshProfile() {
        
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
