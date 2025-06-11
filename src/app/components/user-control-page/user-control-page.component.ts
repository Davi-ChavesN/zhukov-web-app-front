import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { UpdateUser, updateUserRole, User, UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-user-control-page',
    imports: [NavBarComponent, FooterComponent, CommonModule, FormsModule],
    templateUrl: './user-control-page.component.html',
    styleUrl: './user-control-page.component.scss'
})
export class UserControlPageComponent implements OnInit {
    users: User[] = [];

    constructor(private readonly userService: UserService, private readonly toastr: ToastrService, private readonly authService: AuthService) { }

    ngOnInit(): void {
        this.userService.getAllusers().subscribe((data) => {
            this.users = data;
        })
    }

    toggleStatus(user: User): void {
        if (user.status === 'active') {
            user.status = 'inactive';
            this.userService.disableUser(user.id).subscribe({
                next: (response) => {
                    this.toastr.success("Usuário atualizado com sucesso");
                    if (user.id === this.authService.getLoggedUser()?.id) {
                        this.authService.logout();
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.toastr.error("Erro ao atualizar usuário");
                }
            });
        } else {
            user.status = 'active';
            this.userService.enableUser(user.id).subscribe({
                next: (response) => {
                    this.toastr.success("Usuário atualizado com sucesso");
                },
                error: (err) => {
                    console.error(err);
                    this.toastr.error("Erro ao atualizar usuário");
                }
            });
        }
    }

    updateUser(user: User): void {
        const updateUserRole: updateUserRole = {
            id: user.id,
            userRole: user.userRole,
        }

        this.userService.updateUserRole(user.id, updateUserRole).subscribe({
            next: (response) => {
                this.toastr.success("Usuário atualizado com sucesso");
            },
            error: (err) => {
                console.error(err);
                this.toastr.error("Erro ao atualizar usuário");
            }
        });
    }
}
