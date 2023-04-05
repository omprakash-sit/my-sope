import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      title: 'error.title',
    },
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      title: 'error.title',
      errorMessage: 'error.http.403',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      title: 'error.title',
      errorMessage: 'error.http.404',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
