import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequestI } from '../../models/auth/loginRequest.interface';
import { AuthResponseI, User } from '../../models/auth/authResponse.interface';


type AuthStatus = 'checking'|'authenticated'|'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private _AuthStatus = signal<AuthStatus|null>(null);
  private readonly _user = signal<User|null>(null);
  private _token = signal<string | null>(null);

  authStatus = computed<AuthStatus>(() => {
    if (this._AuthStatus() === 'checking') return  'checking' ;

    if (this._user()) {
      return 'authenticated'
    }

    return 'not-authenticated'

  })

  user = computed(() => this._user());
  token = computed(this._token);

  // * Login

  login(formLogin:LoginRequestI):Observable<boolean>{
    return this.httpClient.post<AuthResponseI>(`${environment.api.baseUrl}auth/login`, formLogin).pipe(
      tap(resp => {
        this._user.set(resp.user);
        this._AuthStatus.set('authenticated');
        this._token.set(resp.token);

        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
      }),
      map(() => true),
      catchError((error : any) => {
        this._user.set(null);
        this._token.set(null);
        this._AuthStatus.set('not-authenticated');
        return of(false);
      })
    )
  }

  // * Logout

  logout(){
    localStorage.clear();
  }

  // * Verificar si el usuario esta authenticado o no

  checkStatus():Observable<AuthResponseI|boolean>{
    const token = localStorage.getItem('token');
    if(!token) {
      return of(false);
    }

    return this.httpClient.get<AuthResponseI>(`${environment.api.baseUrl}auth/check-status`)
  }
}
