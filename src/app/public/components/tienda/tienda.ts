import { Component, DestroyRef, effect, inject, resource, signal } from '@angular/core';
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
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../shared/components/pagination/pagination-service';

@Component({
  selector: 'app-tienda',
  imports: [SubMenu, CommonModule, Product, Pagination],
  templateUrl: './tienda.html',
  styleUrl: './tienda.scss',
})
export class Tienda {
  currentGender = signal<string>('all');
  private readonly route = inject(ActivatedRoute);
  public readonly cartCount = inject(CartCount);
  private readonly productService = inject(ProductService);
  public listProducts = signal<ProductI[]>([]);
  public number_page = signal<number>(0);
  public readonly paginationService = inject(PaginationService);
  private destroyRef = inject(DestroyRef);


  constructor(){
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const gender = params['gender'] || 'all';
        this.currentGender.set(gender);
        this.productResource;
      });
  }

  ngOnInit():void {

  }


  // * Obtener los productos

  productResource = rxResource<ProductResponseI, { page: number; gender: string }>({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      gender: this.paginationService.currentGender()
    }),
    stream: ({ params }: { params: { page: number; gender: string } }) => {
      return this.productService.getProducts({
        offset: params.page * 9,
        gender: params.gender !== 'all' ? params.gender : ''
      });
    }
  });


}
