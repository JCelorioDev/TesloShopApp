import { Component, inject } from '@angular/core';
import { SubMenu } from "../../../shared/components/menubar/sub-menu/sub-menu";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tienda',
  imports: [SubMenu, CommonModule],
  templateUrl: './tienda.html',
  styleUrl: './tienda.scss',
})
export class Tienda {
  currentGender: string = 'all';
  private readonly route = inject(ActivatedRoute);

  ngOnInit():void {
      this.route.queryParams.subscribe(params => {
      this.currentGender = params['gender'] || 'all';
    });
  }
}
