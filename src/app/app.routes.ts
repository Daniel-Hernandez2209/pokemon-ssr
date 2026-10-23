import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'About',
    loadComponent: () => import('./pages/about-page/about-page'),
  },
  {
    path: 'Contact',
    loadComponent: () => import('./pages/contact-page/contact-page'),
  },
  {
    path: 'Princing',
    loadComponent: () => import('./pages/princing-page/princing-page'),
  },
  {
    path: '**',
    redirectTo: 'About',
  },
];
