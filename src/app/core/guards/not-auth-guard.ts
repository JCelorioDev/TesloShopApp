import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = (route, state) => {

  if (typeof window === 'undefined') {
    return true;
  }

  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    router.navigateByUrl('menu/tienda');
    return false;
  }

  return true;
};
