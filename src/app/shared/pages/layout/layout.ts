import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menubar } from "../../components/menubar/menubar";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, Menubar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
