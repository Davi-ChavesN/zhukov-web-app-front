import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review, ReviewService } from '../../services/review/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoggedUser } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-review-modal',
    imports: [CommonModule, FormsModule],
    templateUrl: './review-modal.component.html',
    styleUrl: './review-modal.component.scss'
})
export class ReviewModalComponent implements OnInit {
    private mediaId!: string;
    private user!: LoggedUser;
    newReview: Review = {
        userId: '',
        mediaId: '',
        score: 0,
        comment: null,
    }
    private existingReview = false;
    private modal!: Modal;

    @Output() reviewAdded = new EventEmitter<void>();

    constructor(
        private readonly authService: AuthService,
        private readonly reviewService: ReviewService,
        private readonly route: ActivatedRoute,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) { }

    ngOnInit(): void {
        const modalEl = document.getElementById('reviewModal');
        if (modalEl) {
            this.modal = Modal.getOrCreateInstance(modalEl);
        }

        if (this.authService.isLoggedIn()) {
            this.user = this.authService.getLoggedUser()!;
            this.newReview.mediaId = this.route.snapshot.paramMap.get('id')!;
            this.newReview.userId = this.user.id;

            this.verifyExistingReview();
        }
    }

    onSubmit() {
        if (!this.authService.isLoggedIn()) {
            this.toastr.warning('Você precisa estar logado para enviar uma avaliação.');
            this.modal?.hide();
            return;
        }

        if (this.newReview.score < 0) {
            this.newReview.score = 0;
        }
        if (this.newReview.score > 10) {
            this.newReview.score = 10;
        }

        if (this.existingReview) {
            this.reviewService.updateReview(this.newReview).subscribe({
                next: (response) => {
                    this.toastr.success('Avaliação atualizada com sucesso!');
                    this.reviewAdded.emit();
                    this.modal?.hide();
                    this.verifyExistingReview();
                },
                error: (err) => {
                    this.toastr.error('Erro ao atualizar avaliação!');
                    console.error('Erro ao atualizar avaliação:', err);
                    this.modal?.hide();
                }
            });
        } else {
            this.reviewService.reviewRegister(this.newReview).subscribe({
                next: (response) => {
                    this.toastr.success('Avaliação enviada com sucesso!');
                    this.reviewAdded.emit();
                    this.modal?.hide();
                    this.verifyExistingReview();
                },
                error: (err) => {
                    this.toastr.error('Erro ao enviar avaliação!');
                    console.error('Erro ao enviar avaliação:', err);
                    this.modal?.hide();
                }
            });
        }
    }

    verifyExistingReview() {
        this.reviewService.getReviewById(this.newReview.userId, this.newReview.mediaId).subscribe({
            next: (response) => {
                if (response) {
                    this.existingReview = true;
                    this.newReview = response as Review;
                }
            },
            error: (err) => {
                console.error('Erro ao buscar existência de avaliação: ', err);
            }
        });
    }
}
