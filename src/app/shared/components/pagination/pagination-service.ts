import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private readonly activatedRoute = inject(ActivatedRoute);
private readonly router = inject(Router);

  public currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map( params => (params.get('page') ? +params.get('page')! : 1)),
      map(page => (isNaN(page) ? 1 : page))
    ),
    {
      initialValue: 0
    }
  )

   public currentGender = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('gender') || 'all')
    ),
    {
      initialValue: 'all'
    }
  );

   changePage(page: number): void {
    const currentParams = this.activatedRoute.snapshot.queryParams;

    this.router.navigate([], {
      queryParams: {
        ...currentParams, // Mantiene el gender y otros params
        page: page
      },
      queryParamsHandling: 'merge' // Esto es clave
    });
  }
}
