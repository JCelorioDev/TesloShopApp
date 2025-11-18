import { Routes } from "@angular/router";
import { Layout } from "../shared/pages/layout/layout";
import { Inicio } from "./components/inicio/inicio";
import { Tienda } from "./components/tienda/tienda";
import { Carrito } from "./components/carrito/carrito";
import { VerProducto } from "./components/ver-producto/ver-producto";

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu/inicio'
  },
  {
    path: 'menu',
    component: Layout,
    children: [
      {
        path: 'inicio',
        component: Inicio
      },
      {
        path: 'tienda',
        component: Tienda
      },
      {
        path: 'carrito',
        component: Carrito
      },
      {
        path: 'producto/:idProducto',
        component: VerProducto
      },
      {
        path: '**',
        redirectTo: 'inicio'
      }
    ]
  }
] as Routes
