import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup-page',
    standalone: true,
    imports: [NavBarComponent, CommonModule, FormsModule, RouterLink, FooterComponent],
    templateUrl: './signup-page.component.html',
    styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
    formData = {
        name: '',
        nickname: '',
        email: '',
        birthdate: '',
        password: '',
        confirmPassword: '',
    };

    constructor(
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    onSubmit(form: NgForm) {
        if (this.formData.password !== this.formData.confirmPassword) {
            this.toastr.error('As senhas não coincidem', 'Erro');
            return;
        }

        const user = {
            name: this.formData.name,
            nickname: this.formData.nickname,
            email: this.formData.email,
            birthDate: new Date(this.formData.birthdate),
            password: this.formData.password,
        };

        console.log('Usuário criado:', user);

        this.userService.userRegister(user).subscribe({
            next: (response) => {
                this.toastr.success('Usuário registrado com sucesso');
                form.resetForm();
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error('Erro no registro', err);
                this.toastr.error('Erro ao registrar usuário');
            }
        });
    }
}
