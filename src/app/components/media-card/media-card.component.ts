import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from '../../services/media/media.service';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule],
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
