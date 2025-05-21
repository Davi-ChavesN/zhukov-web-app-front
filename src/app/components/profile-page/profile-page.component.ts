import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUser } from '../../services/auth/auth.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-profile-page',
  imports: [NavBarComponent, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {

  loggedUser: LoggedUser | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
  }

}
