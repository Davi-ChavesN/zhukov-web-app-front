import { Component } from '@angular/core';
import { User, UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-password-modal',
    imports: [CommonModule, FormsModule],
    templateUrl: './password-modal.component.html',
    styleUrl: './password-modal.component.scss'
})
export class PasswordModalComponent {
    userEditData!: User;
    formData = {
        newPassword: '',
        confirmNewPassword: '',
        password: ''
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
                },
                error: (err) => {
                    console.error('Erro ao buscar dados do usuário:', err);
                }
            });
        }
    }

    onSubmit() {
        if(this.formData.newPassword !== this.formData.confirmNewPassword) {
            this.toastr.error('As senhas não coincidem');
            return;
        }

        this.userService.updateUserPassword(this.userEditData.id, this.formData).subscribe({
            next: (response) => {
                this.toastr.success('Senha atualizada com sucesso!');
                const modalEl = document.getElementById('passwordModal');
                if (modalEl) {
                    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
                    modal.hide();
                }
                this.authService.logout();
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.toastr.error('Erro ao atualizar senha');
                console.error('Erro ao atualizar senha: ', err);
            }
        })
    }
}
