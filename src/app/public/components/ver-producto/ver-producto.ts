import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/services/products/product';

@Component({
  selector: 'app-ver-producto',
  imports: [],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.scss',
})
export class VerProducto {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(Product);

  constructor(){

  }

  // Ver un producto

  viewProduct():void {

  }
}
