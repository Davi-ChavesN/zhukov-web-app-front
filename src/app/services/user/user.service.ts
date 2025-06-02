import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = `${environment.apiUrl}/user`;

    constructor(private http: HttpClient) { }

    userRegister(user: CreateUser): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    getAllusers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/all`);
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }
}

export interface CreateUser {
    name: string;
    nickname: string;
    email: string;
    birthDate: Date;
    password: string;
}

export interface User extends CreateUser {
    id: string;
}