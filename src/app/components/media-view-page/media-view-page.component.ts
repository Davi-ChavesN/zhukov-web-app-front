import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ActivatedRoute } from '@angular/router';
import { Media, MediaService } from '../../services/media/media.service';
import { Review, ReviewService } from '../../services/review/review.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-media-view-page',
  imports: [NavBarComponent, CommonModule, FooterComponent],
  templateUrl: './media-view-page.component.html',
  styleUrl: './media-view-page.component.scss'
})
export class MediaViewPageComponent implements OnInit{

  mediaId!: string;
  media!: Media;
  reviews: Review[] = [];

  constructor(private route: ActivatedRoute, private mediaService: MediaService, private reviewService: ReviewService) {}

  ngOnInit(): void {
      this.mediaId = this.route.snapshot.paramMap.get('id')!;

      this.mediaService.getMediaById(this.mediaId).subscribe((data) => {
        this.media = data as Media;
      });

      this.reviewService.getAllMediaReviews(this.mediaId).subscribe((data) => {
        this.reviews = data as Review[];
      });
  }
}
