import { Component, inject, input, signal } from '@angular/core';
import { CartCount } from '../../../core/services/cart-count';
import { CommonModule } from '@angular/common';
import { Product as ProductI } from '../../../core/models/products/produtResponse.interface';
import { environment } from '../../../../environments/environment.development';
import {Product as ProductService} from '../../../core/services/products/product'
import { ProductImage } from '../../../core/pipes/product-image.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-product',
  imports: [CommonModule, ProductImage],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  public readonly cartCount = inject(CartCount);
  public product = input.required<ProductI>();
  public url_img = signal<string>('');
  public base_url = signal<string>('');
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  constructor(){
    this.url_img.set(environment.api.photoUrl);
    this.base_url.set(environment.api.baseUrl);
  }

  // * Mostrr una imagen de producto

  getImageProduct(idImage:string):string {
    this.productService.getImageProduct(idImage).subscribe({
      next: (s) => {
        return s;
      },
      error: (err) => {

      }
    })

    return 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
  }

  // * Ir a la vista de ver producto y enviar el id producto

   navigateToProduct(idProducto:string):void {
    this.router.navigate(['menu/producto', idProducto])
   }

}
