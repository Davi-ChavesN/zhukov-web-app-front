import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Media } from '../../services/media/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  @Input() media!: Media;

  constructor(private router: Router) { }

  goToMediaView(id: string) {
    this.router.navigate(['/media', id]);
  }
}
