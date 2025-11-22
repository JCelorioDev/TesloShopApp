import { Routes } from "@angular/router";
import { Profil } from "./components/profil/profil";
import { authGuard } from "../core/guards/auth-guard";


export const privateRoutes = [
  {
    path: 'mi-perfil',
    component: Profil,
    canActivate: [authGuard]
  }
] as Routes
