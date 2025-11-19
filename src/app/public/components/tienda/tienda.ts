import { Component, effect, inject, resource, signal } from '@angular/core';
import { SubMenu } from "../../../shared/components/menubar/sub-menu/sub-menu";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartCount } from '../../../core/services/cart-count';
import { Product } from '../../../shared/components/product/product';
import { Product as ProductService } from '../../../core/services/products/product'
import { Product as ProductI } from '../../../core/models/products/produtResponse.interface';
import { firstValueFrom, map } from 'rxjs';
import {ProductResponseI} from '../../../core/models/products/produtResponse.interface';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

interface ProductRequest {
  page: number;
}

@Component({
  selector: 'app-tienda',
  imports: [SubMenu, CommonModule, Product, Pagination],
  templateUrl: './tienda.html',
  styleUrl: './tienda.scss',
})
export class Tienda {
  currentGender: string = 'all';
  private readonly route = inject(ActivatedRoute);
  public readonly cartCount = inject(CartCount);
  private readonly productService = inject(ProductService);
  public listProducts = signal<ProductI[]>([]);
  public number_page = signal<number>(0);
  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map( params => (params.get('page') ? +params.get('page')! : 1)),
      map(page => (isNaN(page) ? 1 : page))
    ),
    {
      initialValue: 0
    }
  )

  constructor(){
  }

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
        this.number_page.set(s.pages);
      },
      error: (err) => {

      }
    })
  }

  // * Cargar mas productos

  incrementProduct = 10;

   moreProducts():void {
    this.productService.getProducts({
      gender : this.currentGender ?? '',
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


  productResource = rxResource<ProductResponseI, { page: number }>({
    params: () => ({ page: this.currentPage() - 1 }),
    stream: ({ params }: { params: { page: number } }) => {
      return this.productService.getProducts({
        offset: params.page * 9
      });
    }
  });


}
