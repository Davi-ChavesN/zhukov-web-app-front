import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  formData = {
    identifier: '',
    password: '',
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const credentials = {
      email: this.formData.identifier.includes('@') ? this.formData.identifier : '',
      nickname: this.formData.identifier.includes('@') ? '' : this.formData.identifier,
      password: this.formData.password,
    }

    this.authService.userLogin(credentials).subscribe({
      next: (Response) => {console.log('Usuário logado', Response)},
      error: (err) => {console.error('Erro no login', err)}
    });

    this.router.navigateByUrl('/profile');
    form.resetForm();
  }
}
