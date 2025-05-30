import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-create-media-page',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './create-media-page.component.html',
  styleUrl: './create-media-page.component.scss'
})
export class CreateMediaPageComponent {

}
