import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartCount } from '../../../core/services/cart-count';
import { Login } from "../../../auth/login/login";
import { sign } from 'crypto';
import { AuthResponseI } from '../../../core/models/auth/authResponse.interface';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'shared-menubar',
  imports: [CommonModule, RouterModule, Login],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
})
export class Menubar {
  public readonly countService = inject(CartCount);
  private readonly router = inject(Router);
  private readonly authService = inject(Auth);

  isModalOpen = signal<boolean>(false);

  openLoginModal(): void {
    this.isModalOpen.set(true);
  }

  closeLoginModal(): void {
    this.isModalOpen.set(false);
  }

  // * Obtener el valor del localStorage

  get getInfoUser():AuthResponseI|null {
    const userLogin =  localStorage.getItem('userLogin')!;
    if (!!userLogin) {
      return JSON.parse(userLogin);
    }

    return null
  }

  // * Logout

  logout():void {
    this.authService.logout();
  }

}
