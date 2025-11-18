import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  // * Obtener todos los productos

  getProducts(options?: Options): Observable<ProductResponseI> {
    const params: Record<string, string | number> = {};
    params['limit'] = options!.limit || 9;
    params['offset'] = options!.offset || 0;
    params['gender'] = options!.gender || '';


    return this.httpClient.get<ProductResponseI>(
      `${environment.api.baseUrl}products`,
      { params }
    );
  }

  // * Mostar una imagen del producto

  getImageProduct(idImage:string){
    return this.httpClient.get(`${environment.api.baseUrl}${environment.api.photoUrl}${idImage}`)
  }

  // * Ver un productoo

  viewProduct(idProducto:string):Observable<ProductShowResponseI>{
    return this.httpClient.get<ProductShowResponseI>(`${environment.api.baseUrl}products/${idProducto}`)
  }
}
