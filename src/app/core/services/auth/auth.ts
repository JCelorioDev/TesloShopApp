import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequestI } from '../../models/auth/loginRequest.interface';
import { AuthResponseI, User } from '../../models/auth/authResponse.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { RegisterRequestI } from '../../models/auth/registerRequest.interface';


type AuthStatus = 'checking'|'authenticated'|'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private _AuthStatus = signal<AuthStatus|null>(null);
  private readonly _user = signal<User|null>(null);
  private _token = signal<string | null>(null);

  checkStatusResource =  rxResource({
    stream: () => this.checkStatus()
  });

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
      map((resp) => this.handleAuthSuccess(resp)),
      catchError(err => this.handleAuthError(err))
    )
  }

  // * Logout

  logout(){
    this._user.set(null);
    this._token.set(null);
    this._AuthStatus.set('not-authenticated');

    localStorage.clear();
  }

  // * Verificar si el usuario esta authenticado o no

  checkStatus():Observable<AuthResponseI|boolean>{
    const token = localStorage.getItem('token');
    if(!token) {
      this.logout();
      return of(false);
    }

    return this.httpClient.get<AuthResponseI>(`${environment.api.baseUrl}auth/check-status`)
  }

  private handleAuthSuccess({token, user}: AuthResponseI){
    this._user.set(user);
    this._AuthStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return true
  }

  private handleAuthError(error: any){
    this.logout();
    return of(error);
  }

  // * Registrar

  register(formRegister:RegisterRequestI):Observable<AuthResponseI|boolean>{
    return this.httpClient.post<AuthResponseI>(`${environment.api.baseUrl}auth/register`, formRegister).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError(err => this.handleAuthError(err))
    )
  }
}
