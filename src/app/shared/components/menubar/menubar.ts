import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartCount } from '../../../core/services/cart-count';

@Component({
  selector: 'shared-menubar',
  imports: [CommonModule, RouterModule],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
})
export class Menubar {
  public readonly countService = inject(CartCount);
  private readonly router = inject(Router);

  navigateALogin():void{
    this.router.navigate(['auth/login']);
  }
}
