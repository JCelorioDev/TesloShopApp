import { Component, computed, inject, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { AuthResponseI, User } from '../../../core/models/auth/authResponse.interface'; '../../../core/models/auth/authResponse.interface'

@Component({
  selector: 'private-profil',
  imports: [],
  templateUrl: './profil.html',
  styleUrl: './profil.scss',
})
export class Profil {

  private readonly authService = inject(Auth);
  private objUser = signal<User|null>(null);

  constructor(){
    this.verifyStatusCheck();
  }


  // * Verificar le status Check

  verifyStatusCheck():void {
    this.authService.checkStatus().subscribe({
      next: (s:any) => {
        this.objUser.set(s.user);
      },
      error: (err) => {

      }
    })
  }

  showObjUser = computed(() => {
    return this.objUser();
  })
}
