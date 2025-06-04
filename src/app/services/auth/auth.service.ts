import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'token';
    private userKey = 'user';

    constructor(private http: HttpClient, private router: Router) { }

    userLogin(credentials: Credentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem(this.tokenKey, response.token);
                localStorage.setItem(this.userKey, JSON.stringify(response.user));
            })
        );
    }

    isLoggedIn(): boolean {
        return this.isTokenValid();
    }

    private isTokenValid(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const now = Date.now().valueOf() / 1000;
            if (decoded.exp < now) {
                this.logout(); // token expired
                return false;
            }
            return true;
        } catch (error) {
            this.logout(); // invalid token
            return false;
        }
    }

    getLoggedUser(): LoggedUser | null {
        const userData = localStorage.getItem(this.userKey);
        return userData ? JSON.parse(userData) : null;
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.router.navigateByUrl('/home');
    }
}

interface JwtPayload {
    exp: number;
    iat: number;
    sub: string;
}

export interface Credentials {
    email: string;
    nickname: string;
    password: string;
}

export interface LoggedUser {
    id: string;
    name: string;
    nickname: string;
    email: string;
    birthDate: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: LoggedUser;
}
