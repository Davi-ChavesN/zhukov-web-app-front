import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { User, UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-user-edit-modal',
    imports: [CommonModule, FormsModule],
    templateUrl: './user-edit-modal.component.html',
    styleUrl: './user-edit-modal.component.scss'
})
export class UserEditModalComponent implements OnInit {
    userEditData!: User;
    formData = {
        name: '',
        nickname: '',
        email: '',
        birthDate: '',
        confirmPassword: '',
        userRole: ''
    }

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) { }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.userService.getUserById(this.authService.getLoggedUser()!.id).subscribe({
                next: (user) => {
                    this.userEditData = user;
                    this.formData = {
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email,
                        birthDate: user.birthDate,
                        confirmPassword: '',
                        userRole: user.userRole,
                    }
                },
                error: (err) => {
                    console.error('Erro ao buscar dados do usuário:', err);
                }
            });
        }
    }

    onSubmit() {
        this.userService.updateUser(this.userEditData.id, this.formData).subscribe({
            next: (response) => {
                this.toastr.success('Usuário atualizado com sucesso!');
                const modalEl = document.getElementById('userModal');
                if (modalEl) {
                    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
                    modal.hide();
                }
                this.authService.logout();
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.toastr.error('Erro ao atualizar usuário');
                console.error('Erro ao atualizar usuário: ', err);
            }
        })
    }
}
