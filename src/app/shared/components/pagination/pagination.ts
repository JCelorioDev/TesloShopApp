import { CommonModule } from '@angular/common';
import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'shared-pagination',
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {

  pages = input(0);
  currentPage = input<number>(1);
  activePage = linkedSignal(this.currentPage);

  constructor(){

  }

  // * Obtener un array en base a un valor N

  getPagesList = computed(() => {
    return Array.from({length : this.pages()}, (_, i) => i + 1)
  })

}
