import { Component, inject, signal } from '@angular/core';
import { SubMenu } from "../../../shared/components/menubar/sub-menu/sub-menu";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartCount } from '../../../core/services/cart-count';
import { Product } from '../../../shared/components/product/product';
import { Product as ProductService } from '../../../core/services/products/product'
import { Product as ProductI } from '../../../core/models/products/produtResponse.interface';


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
  private readonly productService = inject(ProductService);
  public listProducts = signal<ProductI[]>([]);

  ngOnInit():void {
      this.route.queryParams.subscribe(params => {
      this.currentGender = params['gender'] || 'all';
    });

    // * Llamar para obtener todos los productos

    this.getProducts();
  }

  // * Obtener todos los productos

  getProducts():void {
    this.productService.getProducts().subscribe({
      next: (s)  => {
        this.listProducts.set(s.products);
      },
      error: (err) => {

      }
    })
  }




}
