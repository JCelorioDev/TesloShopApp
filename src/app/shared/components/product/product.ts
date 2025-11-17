import { Component, inject, input, signal } from '@angular/core';
import { CartCount } from '../../../core/services/cart-count';
import { CommonModule } from '@angular/common';
import { Product as ProductI } from '../../../core/models/products/produtResponse.interface';


@Component({
  selector: 'shared-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  public readonly cartCount = inject(CartCount);
  public product = input.required<ProductI>();

}
