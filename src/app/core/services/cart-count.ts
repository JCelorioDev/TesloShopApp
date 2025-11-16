import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartCount {


  private count = signal<number>(2);

  // * Agregar items al carrito

  public addItemsCart(): void {
    this.count.update((current) => current + 1);
  };

  // * Mostrar el valor de los items del carrito

  public showCountItemsCart = computed(() => {
    return this.count();
  })

    // * Quitar items al carrito

    public removeItemsCart():void {
      if (this.showCountItemsCart() < 1) return ;
      this.count.update((current) => current - 1);
    }
}
