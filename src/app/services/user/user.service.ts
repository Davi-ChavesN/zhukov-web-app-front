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

    updateUser(id: string, user: UpdateUser): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
    }

    updateUserPassword(id: string, userPassword: UpdateUserPassword): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/update-password/${id}`, userPassword);
    }

    disableUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.apiUrl}/delete/${id}`);
    }

    enableUser(id: string): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/enable/${id}`, {});
    }

    updateUserRole(id: string, dto: updateUserRole): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/update-role/${id}`, dto);
    }
}

export interface CreateUser {
    name: string;
    nickname: string;
    email: string;
    birthDate: string;
    password: string;
}

export interface User extends CreateUser {
    id: string;
    status: string;
    userRole: string;
}

export interface UpdateUser {
    name: string;
    nickname: string;
    email: string;
    birthDate: string;
    confirmPassword: string;
    userRole: string;
}

export interface UpdateUserPassword {
    newPassword: string;
    confirmNewPassword: string;
    password: string;
}

export interface updateUserRole {
    id: string;
    userRole: string;
}