import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, output, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PaginationService } from './pagination-service';

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
   private paginationService = inject(PaginationService);

  constructor(){

  }

    changePage(page: number): void {
    this.paginationService.changePage(page); 
  }

  // * Obtener un array en base a un valor N

  getPagesList = computed(() => {
    return Array.from({length : this.pages()}, (_, i) => i + 1)
  })

}
