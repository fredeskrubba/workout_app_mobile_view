import { Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'sessions',
        loadComponent: () =>
          import('./pages/sessions/sessions.page').then((m) => m.SessionsPage),
      },
      {
        path: 'routines',
        loadComponent: () =>
          import('./pages/routines/routines.page').then((m) => m.RoutinesPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];