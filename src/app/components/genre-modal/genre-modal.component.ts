import { Component, EventEmitter, Output } from '@angular/core';
import { CreateGenre, GenreService } from '../../services/genre/genre.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-genre-modal',
    imports: [FormsModule],
    templateUrl: './genre-modal.component.html',
    styleUrl: './genre-modal.component.scss'
})
export class GenreModalComponent {
    formData = {
        description: ''
    }

    @Output() genreAdded = new EventEmitter<void>();

    constructor(private genreService: GenreService, private toastr: ToastrService) { }

    addGenre(form: NgForm) {
        const genre: CreateGenre = {
            description: this.formData.description,
        }

        this.genreService.genreRegister(genre).subscribe(() => {
            this.formData.description = '';
            this.genreAdded.emit();
            const modalEl = document.getElementById('genreModal');
            if (modalEl) {
                this.toastr.success('Gênero adicionado com sucesso');
                const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
                modal.hide();
            }
        });
    }
}
