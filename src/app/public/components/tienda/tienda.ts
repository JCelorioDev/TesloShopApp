import { Component, inject, resource, signal } from '@angular/core';
import { SubMenu } from "../../../shared/components/menubar/sub-menu/sub-menu";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartCount } from '../../../core/services/cart-count';
import { Product } from '../../../shared/components/product/product';
import { Product as ProductService } from '../../../core/services/products/product'
import { Product as ProductI } from '../../../core/models/products/produtResponse.interface';
import { firstValueFrom } from 'rxjs';
import {ProductResponseI} from '../../../core/models/products/produtResponse.interface';


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

  constructor(){
  }



  public listProductResource = resource<ProductResponseI | null, Error>({
    loader: () => firstValueFrom(this.productService.getProducts())
  });

  ngOnInit():void {
      this.route.queryParams.subscribe(params => {
      this.currentGender = params['gender'] || 'all';
      if (this.currentGender !== 'all') {
        this.getProducts(this.currentGender)
      }
    });
    // * Llamar para obtener todos los productos
    this.getProducts();
  }

  // * Obtener todos los productos

  getProducts(gender?:string):void {
    this.productService.getProducts({
      gender : gender
    }).subscribe({
      next: (s)  => {
        this.listProducts.set(s.products);
      },
      error: (err) => {

      }
    })
  }

  // * Cargar mas productos

  incrementProduct = 10;

   moreProducts():void {
    this.productService.getProducts({
      offset : this.incrementProduct
    }).subscribe({
      next: (s:any) => {
        this.listProducts.update((current) => [...current, ...s.products]);
        this.incrementProduct += 10;
      },
      error: (err) => {

      }
    })
   }





}
