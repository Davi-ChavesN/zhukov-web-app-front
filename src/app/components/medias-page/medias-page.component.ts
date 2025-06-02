import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Genre, GenreService } from '../../services/genre/genre.service';
import { Media, MediaService } from '../../services/media/media.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MediaCardComponent } from "../media-card/media-card.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-medias-page',
    standalone: true,
    imports: [NavBarComponent, FormsModule, CommonModule, FooterComponent, MediaCardComponent],
    templateUrl: './medias-page.component.html',
    styleUrl: './medias-page.component.scss'
})
export class MediasPageComponent implements OnInit {

    mediaList: Media[] = [];
    filteredMedias: Media[] = [];

    searchTerm = '';
    selectedGenre = '';
    selectedYear: number | null = null;
    genresList: Genre[] = [];

    constructor(
        private mediaService: MediaService,
        private genreService: GenreService,
        private router: Router,
        readonly authService: AuthService,
    ) {

    }

    ngOnInit(): void {
        this.mediaService.getAllMedias().subscribe((data) => {
            this.mediaList = data as Media[];
            this.filteredMedias = this.mediaList
        });

        this.genreService.getAllGenres().subscribe((data) => {
            this.genresList = data as Genre[];
        });
    }

    filterMedias() {
        this.filteredMedias = this.mediaList.filter(media => {
            const matchesSearch = media.title.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesGenre = !this.selectedGenre || media.mediaGenres.includes(this.selectedGenre);
            const matchesYear = !this.selectedYear || media.releaseYear === this.selectedYear;

            return matchesSearch && matchesGenre && matchesYear;
        });
    }

    getAvailableYears(): number[] {
        const years = this.mediaList.map(m => m.releaseYear);
        return Array.from(new Set(years)).sort((a, b) => b - a);
    }

    goToMediaView(id: string) {
        this.router.navigate(['/media', id]);
    }

    goToCreateMediaPage() {
        this.router.navigate(['/media-create']);
    }

}




