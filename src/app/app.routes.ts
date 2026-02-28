import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/aut/login/login').then((m) => m.LoginPage),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./layouts/main-layout/main-layout').then((m) => m.MainLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/landing/landing').then((m) => m.LandingPage),
            },
            {
                path: 'group',
                loadComponent: () =>
                    import('./pages/group/group').then((m) => m.GroupComponent),
            },
            {
                path: 'user',
                loadComponent: () =>
                    import('./pages/user/user').then((m) => m.UserComponent),
            },
        ],
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                redirectTo: '',
                pathMatch: 'full',
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/aut/register/register').then((m) => m.RegisterPage),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
