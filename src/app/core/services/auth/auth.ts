import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequestI } from '../../models/auth/loginRequest.interface';
import { AuthResponseI } from '../../models/auth/authResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);

  // * Login

  login(formLogin:LoginRequestI):Observable<AuthResponseI>{
    return this.httpClient.post<AuthResponseI>(`${environment.api.baseUrl}auth/login`, formLogin)
  }

  // * Logout

  logout(){
    localStorage.removeItem('userLogin');
  }
}
