import { Component, inject } from '@angular/core';
import { CartCount } from '../../../core/services/cart-count';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'shared-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  public readonly cartCount = inject(CartCount);

}
