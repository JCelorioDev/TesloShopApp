import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-menubar',
  imports: [CommonModule, RouterModule],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
})
export class Menubar {

}
