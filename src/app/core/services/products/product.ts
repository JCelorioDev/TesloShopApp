import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ProductResponseI } from '../../models/products/produtResponse.interface';
import { environment } from '../../../../environments/environment';
import { ProductShowResponseI } from '../../models/products/productShowResponse.interface';


interface Options {
  limit ? : number,
  offset ? : number,
  gender ? : string
}

@Injectable({
  providedIn: 'root',
})
export class Product {
  private readonly httpClient = inject(HttpClient);
  private productsCache = new Map<string, ProductResponseI>();
  private productCache = new Map<string, ProductShowResponseI>();

  // * Obtener todos los productos

  getProducts(options?: Options): Observable<ProductResponseI> {
    const params: Record<string, string | number> = {};
    params['limit'] = options!.limit || 9;
    params['offset'] = options!.offset || 0;
    params['gender'] = options!.gender || '';
    const key = `${params['limit']}-${params['offset']}-${params['gender']}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    return this.httpClient.get<ProductResponseI>(
      `${environment.api.baseUrl}products`,
      { params }
    ).pipe(
      tap((resp) => this.productsCache.set(key, resp))
    );
  }

  // * Mostar una imagen del producto

  getImageProduct(idImage:string){
    return this.httpClient.get(`${environment.api.baseUrl}${environment.api.photoUrl}${idImage}`)
  }

  // * Ver un productoo

  viewProduct(idProducto:string):Observable<ProductShowResponseI>{


    if (this.productCache.has(idProducto)) {
      return of(this.productCache.get(idProducto)!)
    }


    return this.httpClient.get<ProductShowResponseI>(`${environment.api.baseUrl}products/${idProducto}`).pipe(tap((resp) => this.productCache.set(idProducto, resp)))
  }
}
