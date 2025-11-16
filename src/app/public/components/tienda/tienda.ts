import { Component, inject } from '@angular/core';
import { SubMenu } from "../../../shared/components/menubar/sub-menu/sub-menu";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartCount } from '../../../core/services/cart-count';
import { Product } from '../../../shared/components/product/product';


@Component({
  selector: 'app-tienda',
  imports: [SubMenu, CommonModule, Product],
  templateUrl: './tienda.html',
  styleUrl: './tienda.scss',
})
export class Tienda {
  currentGender: string = 'all';
  private readonly route = inject(ActivatedRoute);
  public readonly cartCount = inject(CartCount);

  ngOnInit():void {
      this.route.queryParams.subscribe(params => {
      this.currentGender = params['gender'] || 'all';
    });
  }

  generateArray(n: number): number[] {
  return Array.from({length: n}, (_, i) => i + 1);
  }


}
