import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'public-carrousel',
  imports: [],
  templateUrl: './carrousel.html',
  styleUrl: './carrousel.scss',
})
export class Carrousel {
  private router = inject(Router);
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          initFlowbite();
        }, 100);
      });
  }
}
