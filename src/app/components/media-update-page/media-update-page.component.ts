import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Genre, GenreService } from '../../services/genre/genre.service';
import { Media, MediaService, UpdateMedia } from '../../services/media/media.service';
import { FooterComponent } from "../footer/footer.component";
import { GenreModalComponent } from "../genre-modal/genre-modal.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-media-update-page',
    imports: [FooterComponent, NavBarComponent, CommonModule, FormsModule, GenreModalComponent, NgSelectModule],
    templateUrl: './media-update-page.component.html',
    styleUrl: './media-update-page.component.scss'
})
export class MediaUpdatePageComponent {
    genresList: Genre[] = [];
    mediaId!: string;
    media!: Media;
    formData = {
        title: '',
        description: '',
        director: '',
        releaseYear: 0,
        duration: 0,
        producer: '',
        score: 0,
        posterUrl: '',
        bannerUrl: '',
        trailerUrl: '',
        genreIds: [] as string[],
    }
    touchedGenres: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private genreService: GenreService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.mediaId = this.route.snapshot.paramMap.get('id')!;

        forkJoin({
            media: this.mediaService.getMediaById(this.mediaId),
            genres: this.genreService.getAllGenres()
        }).subscribe(({ media, genres }) => {
            this.media = media as Media;
            this.genresList = genres;

            this.formData = {
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
                genreIds: this.media.mediaGenres
                    .map(name => genres.find(g => g.description === name)?.id)
                    .filter(id => !!id) as string[]
            };
        });
    }

    onSubmit(form: NgForm) {
        const media: UpdateMedia = {
            id: this.mediaId,
            title: this.formData.title,
            description: this.media.description,
            director: this.formData.director,
            releaseYear: this.formData.releaseYear,
            duration: this.formData.duration,
            producer: this.formData.producer,
            score: this.formData.score,
            posterUrl: this.formData.posterUrl,
            bannerUrl: this.media.bannerUrl,
            trailerUrl: this.media.trailerUrl,
            genreIds: this.formData.genreIds,
        }

        this.mediaService.mediaUpdate(media.id, media).subscribe({
            next: (response) => {
                this.toastr.success('Mídia atualizada com sucesso');
                this.router.navigate(['/media', this.mediaId]);
            },
            error: (err) => {
                this.toastr.error('Erro ao atualizar mídia');
                console.error(err);
            }
        })
    }

    removeGenre(id: string) {
        this.formData.genreIds = this.formData.genreIds.filter(genreId => genreId !== id);
    }

    getGenreName(id: string) {
        const genre = this.genresList.find(genre => genre.id === id);
        return genre ? genre.description : '';
    }

    refreshGenres() {
        this.genreService.getAllGenres().subscribe((genres) => {
            this.genresList = genres;
        });
    }

    cancelUpdate() {
        this.toastr.info('Atualização cancelada');
        this.router.navigate(['/media', this.mediaId]);
    }
}
