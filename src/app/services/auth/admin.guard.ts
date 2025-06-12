import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor (private authService: AuthService, private router: Router, private toastr: ToastrService) {}

    canActivate(): boolean {
        const user = this.authService.getLoggedUser();

        if(user && user.role === 'admin' || 'root') {
            return true;
        }

        if(!user) {
            this.toastr.info('Você precisa estar logado para acessar esta página.');
        } else {
            this.toastr.info('Permissões insufucientes para acessar esta página.');
        }
        this.router.navigate(['/home']);
        return false;
    }
}