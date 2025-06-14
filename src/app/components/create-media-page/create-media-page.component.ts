import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Genre, GenreService } from '../../services/genre/genre.service';
import { CreateMedia, MediaService } from '../../services/media/media.service';
import { FooterComponent } from "../footer/footer.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { GenreModalComponent } from "../genre-modal/genre-modal.component";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-media-page',
    imports: [NavBarComponent, FooterComponent, CommonModule, FormsModule, NgSelectModule, GenreModalComponent],
    templateUrl: './create-media-page.component.html',
    styleUrl: './create-media-page.component.scss'
})
export class CreateMediaPageComponent implements OnInit {
    genresList: Genre[] = [];
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
        private mediaService: MediaService,
        private genreService: GenreService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.genreService.getAllGenres().subscribe((genres) => {
            this.genresList = genres;
        })
    }

    onSubmit(form: NgForm) {
        const media: CreateMedia = {
            title: this.formData.title,
            description: this.formData.description,
            director: this.formData.director,
            releaseYear: this.formData.releaseYear,
            duration: this.formData.duration,
            producer: this.formData.producer,
            score: this.formData.score,
            posterUrl: this.formData.posterUrl,
            bannerUrl: this.formData.bannerUrl,
            trailerUrl: this.formData.trailerUrl,
            genreIds: this.formData.genreIds,
        }

        this.mediaService.mediaRegister(media).subscribe({
            next: (response) => {
                this.toastr.success('Mídia registrada com sucesso');
                form.resetForm();
            },
            error: (err) => {
                this.toastr.error('Erro ao registrar mídia');
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

}
