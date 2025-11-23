import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartCount } from '../../../core/services/cart-count';
import { Login } from "../../../auth/login/login";
import { sign } from 'crypto';
import { AuthResponseI, User } from '../../../core/models/auth/authResponse.interface';
import { Auth } from '../../../core/services/auth/auth';
import { Register } from "../../../auth/register/register";

@Component({
  selector: 'shared-menubar',
  imports: [CommonModule, RouterModule, Login, Register],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
})
export class Menubar {
  public readonly countService = inject(CartCount);
  private readonly router = inject(Router);
  private readonly authService = inject(Auth);

  isModalOpen = signal<boolean>(false);
  isRegisterModalOpen = signal<boolean>(false);

  openLoginModal(): void {
    this.isModalOpen.set(true);
  }

  closeLoginModal(): void {
    this.isModalOpen.set(false);
  }

  openRegisterFromLogin(): void {
    this.isModalOpen.set(false);
    this.isRegisterModalOpen.set(true);
  }

  openLoginFromRegister(): void {
    this.isRegisterModalOpen.set(false);
    this.isModalOpen.set(true);
  }

  onRegistrationCompleted(): void {
    console.log('Registro completado, cerrando modales');
    this.isModalOpen.set(false);
    this.isRegisterModalOpen.set(false);
  }

  closeRegisterModal(): void {
    this.isRegisterModalOpen.set(false);
  }

  // * Obtener el valor del localStorage

  get getInfoUser():User|null {
    const userLogin =  localStorage.getItem('user')!;
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
