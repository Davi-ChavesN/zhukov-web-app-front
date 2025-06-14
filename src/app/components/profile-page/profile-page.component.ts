import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUser } from '../../services/auth/auth.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { Review, ReviewService } from '../../services/review/review.service';
import { MediaService } from '../../services/media/media.service';
import { Router } from '@angular/router';
import { UserEditModalComponent } from "../user-edit-modal/user-edit-modal.component";
import { ToastrService } from 'ngx-toastr';
import { PasswordModalComponent } from "../password-modal/password-modal.component";
import { DisableAccountModalComponent } from "../disable-account-modal/disable-account-modal.component";

@Component({
    selector: 'app-profile-page',
    imports: [NavBarComponent, CommonModule, FooterComponent, UserEditModalComponent, PasswordModalComponent, DisableAccountModalComponent],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
    user!: LoggedUser;
    userReviews: Review[] = [];
    mediaTitles: { [mediaId: string]: string } = {};

    constructor(
        readonly authService: AuthService,
        private readonly reviewService: ReviewService,
        private readonly mediaService: MediaService,
        private readonly router: Router,
        private readonly toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            const userData = this.authService.getLoggedUser();

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
        } else {
            this.toastr.info('Você precisa estar logado para acessar seu perfil!');
            this.router.navigate(['/login']);
        }
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
