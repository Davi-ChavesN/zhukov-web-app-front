import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.toastr.info('Você precisa estar logado para acessar esta página.');
        this.router.navigate(['/home']);
        return false;
    }
}