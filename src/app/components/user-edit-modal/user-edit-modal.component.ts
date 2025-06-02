import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User, UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-user-edit-modal',
    imports: [CommonModule, FormsModule],
    templateUrl: './user-edit-modal.component.html',
    styleUrl: './user-edit-modal.component.scss'
})
export class UserEditModalComponent implements OnInit {
    userEditData!: User;

    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        if(this.authService.isLoggedIn()) {
            this.userService.getUserById(this.authService.getLoggedUser()!.id).subscribe({
                next: (user) => {
                    this.userEditData = user;
                },
                error: (err) => {
                    console.error('Erro ao buscar dados do usuário:', err);
                }
            });
        }
    }

    onSubmit() {

    }
}
