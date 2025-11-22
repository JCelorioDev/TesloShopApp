import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


  if (typeof window === 'undefined') {
    return true;
  }

  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (!token) {
    window.history.back();
    return false;
  }

  return true;
};
