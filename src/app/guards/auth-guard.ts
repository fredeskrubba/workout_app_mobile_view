import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  if (authService.getAccessToken()) {
    return true;
  }

  return authService.refreshAccessToken().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/login'])))
);
};
