import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLinkActive, Router } from "@angular/router";


@Component({
  selector: 'shared-sub-menu',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './sub-menu.html',
  styleUrl: './sub-menu.scss',
})
export class SubMenu {
  private router = inject(Router);
  private selectedFilter = signal<string>('');

  navigateToGender(gender: string) {
    this.router.navigate(['menu/tienda'], {
      queryParams: { gender: gender }
    });
    this.selectedFilter.set(gender);
  }

  // * Mostrar el valor de selected filter

  showSelectedFilter = computed(() => {
    return this.selectedFilter();
  })
}
