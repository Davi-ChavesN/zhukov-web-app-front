import { Routes } from '@angular/router';
import { MediasPageComponent } from './components/medias-page/medias-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SocialPageComponent } from './components/social-page/social-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MediaViewPageComponent } from './components/media-view-page/media-view-page.component';
import { CreateMediaPageComponent } from './components/create-media-page/create-media-page.component';
import { MediaUpdatePageComponent } from './components/media-update-page/media-update-page.component';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { OutOfBoundsPageComponent } from './components/out-of-bounds-page/out-of-bounds-page.component';

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
        path: 'media-create',
        component: CreateMediaPageComponent
    },
    {
        path: 'media-edit/:id',
        component: MediaUpdatePageComponent
    },
    {
        path: 'media/:id',
        component: MediaViewPageComponent
    },
    {
        path: 'social',
        component: SocialPageComponent
    },
    {
        path: 'user/:id',
        component: UserProfilePageComponent
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
    {
        path: 'out-of-bounds',
        component: OutOfBoundsPageComponent
    },
    {
        path: '**',
        redirectTo: 'out-of-bounds',
        pathMatch: 'full'
    }
];
