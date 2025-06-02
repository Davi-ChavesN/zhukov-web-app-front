import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user/user.service';
import { FooterComponent } from "../footer/footer.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-social-page',
    imports: [NavBarComponent, FooterComponent, CommonModule],
    templateUrl: './social-page.component.html',
    styleUrl: './social-page.component.scss'
})
export class SocialPageComponent implements OnInit {

    userList!: User[];

    constructor(
        private userService: UserService,
        private router: Router,
    ) {

    }

    ngOnInit(): void {
        this.userService.getAllusers().subscribe({
            next: (response) => {
                this.userList = response;
            },
            error: (err) => {
                console.error('Erro ao carregar usuários: ', err);
            }
        });
    }

    goToUserProfile(userId: string) {
        this.router.navigate([]);
    }
}
