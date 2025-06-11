import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-disable-account-modal',
    imports: [],
    templateUrl: './disable-account-modal.component.html',
    styleUrl: './disable-account-modal.component.scss'
})
export class DisableAccountModalComponent {
    constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly toastr: ToastrService) { }

    onDisableAccount() {
        if (this.authService.isLoggedIn()) {
            this.userService.disableUser(this.authService.getLoggedUser()!.id).subscribe({
                next: (reponse) => {
                    const modalEl = document.getElementById('disableAccountModal');
                    if (modalEl) {
                        this.toastr.success('Conta desativada com sucesso');
                        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
                        modal.hide();
                    }
                    this.authService.logout();
                },
                error: (err) => {
                    this.toastr.error('Erro ao desativar a conta');
                    console.error(err);
                }
            })
        }



    }
}
