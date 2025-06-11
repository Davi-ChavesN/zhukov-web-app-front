import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-page',
    imports: [NavBarComponent, FormsModule, CommonModule, RouterLink, FooterComponent],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

    formData = {
        identifier: '',
        password: '',
    }

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    onSubmit(form: NgForm) {
        const credentials = {
            email: this.formData.identifier.includes('@') ? this.formData.identifier : '',
            nickname: this.formData.identifier.includes('@') ? '' : this.formData.identifier,
            password: this.formData.password,
        }

        this.authService.userLogin(credentials).subscribe({
            next: (response) => {
                this.toastr.success('Login realizado com sucesso!');
                form.resetForm();
                this.router.navigateByUrl('/profile');
            },
            error: (err) => {
                console.error('Erro ao realizar login', err);
                this.toastr.error(`Erro ao realizar Login: ${err.error.clientMessage}`);
            }
        });
    }
}
