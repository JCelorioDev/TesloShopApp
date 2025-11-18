import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/services/products/product';
import { ProductShowResponseI as ProductI } from '../../../core/models/products/productShowResponse.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-producto',
  imports: [CommonModule],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.scss',
})
export class VerProducto {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(Product);
  private idProducto = signal<string>('');
  public objProducto = signal<ProductI|null>(null);

  constructor(){
    this.idProducto.set(this.route.snapshot.paramMap.get('idProducto')!);
    this.viewProduct();
  }

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
}
