import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'productImage'
})

export class ProductImage implements PipeTransform {
  transform(value: string | string[]): string {
    if (typeof value === 'string')  {
      return `${environment.api.baseUrl}${environment.api.photoUrl}${value}`
    }

    const image = value.at(0);

    if (!image) {
      return `assets/img/no-image.jpg`
    }

    return `${environment.api.baseUrl}${environment.api.photoUrl}${image}`
  }
}
