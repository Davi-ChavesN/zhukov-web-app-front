import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule],
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
    termsAccepted: false
  };

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('As senhas não coincidem!');
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
      next: (response) => console.log('Usuário registrado', response),
      error: (err) => console.error('Erro no registro', err)
    });

    form.resetForm();
    this.router.navigate(['/login']);
  }
}
