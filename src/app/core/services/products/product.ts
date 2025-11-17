import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseI } from '../../models/products/produtResponse.interface';
import { environment } from '../../../../environments/environment';







@Injectable({
  providedIn: 'root',
})
export class Product {
  private readonly httpClient = inject(HttpClient);

  // * Obtener todos los productos

  getProducts():Observable<ProductResponseI>{
    return this.httpClient.get<ProductResponseI>(`${environment.api.baseUrl}products`)
  }
}
