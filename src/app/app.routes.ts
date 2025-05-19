import { Routes } from '@angular/router';
import { MediasPageComponent } from './components/medias-page/medias-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SocialPageComponent } from './components/social-page/social-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'medias',
        component: MediasPageComponent
    },
    {
        path: 'social',
        component: SocialPageComponent
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'signup',
        component: SignupPageComponent
    },
];
