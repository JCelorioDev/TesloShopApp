import { Routes } from "@angular/router";
import { Register } from "./register/register";
import { Login } from "./login/login";
import { notAuthGuard } from "../core/guards/not-auth-guard";


export default [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: Login,
    canActivate: [notAuthGuard]
  },
  {
    path: 'auth/register',
    component: Register,
    canActivate: [notAuthGuard]
  }
] as Routes
