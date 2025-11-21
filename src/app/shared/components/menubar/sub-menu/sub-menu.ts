import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLinkActive, Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'shared-sub-menu',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './sub-menu.html',
  styleUrl: './sub-menu.scss',
})
export class SubMenu {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private selectedFilter = signal<string>('');

 navigateToGender(gender: string) {
    const currentParams = this.route.snapshot.queryParams;

    this.router.navigate(['menu/tienda'], {
      queryParams: {
        ...currentParams, // Mantiene el page actual
        gender: gender
      },
      queryParamsHandling: 'merge'
    });
    this.selectedFilter.set(gender);
  }


  // * Mostrar el valor de selected filter

  showSelectedFilter = computed(() => {
    return this.selectedFilter();
  })
}
