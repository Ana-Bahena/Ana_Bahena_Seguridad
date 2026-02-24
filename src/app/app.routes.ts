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
            import('./pages/landing/landing').then((m) => m.LandingPage),
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
