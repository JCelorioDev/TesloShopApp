import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

export const Interceptor: HttpInterceptorFn = (req, next) => {

  if (typeof window === 'undefined') {
    return next(req);
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const reqClone = req.clone({ headers });
  return next(reqClone);
};
