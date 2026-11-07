import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Pokemons/pages/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page'),
  },
  {
    path: 'Pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon'),
  },
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
