import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../../core/services/products/product';
import { ProductShowResponseI as ProductI } from '../../../core/models/products/productShowResponse.interface';
import { CommonModule } from '@angular/common';
import { ProductImage } from '../../../core/pipes/product-image.pipe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-ver-producto',
  imports: [CommonModule, ProductImage, RouterModule, RouterLink],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.scss',
})
export class VerProducto {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(Product);
  private idProducto = signal<string>('');
  public objProducto = signal<ProductI|null>(null);


  constructor(){
    this.idProducto.set(this.route.snapshot.paramMap.get('idProducto')!);
    this.viewProduct();
  }

  public productResource = resource<ProductI | null, Error>({
    loader: () => firstValueFrom(this.productService.viewProduct(this.idProducto()))
  });

  // Ver un producto

  viewProduct():void {
    this.productService.viewProduct(this.idProducto()).subscribe({
      next: (s) => {
        this.objProducto.set(s);
      },
      error: (err) => {

      }
    })
  }

  goToShop():void{
    this.router.navigate(['menu/tienda']);
  }
}
