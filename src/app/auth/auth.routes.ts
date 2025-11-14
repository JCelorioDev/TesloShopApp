import { Routes } from "@angular/router";
import { Register } from "./register/register";
import { Login } from "./login/login";

export default [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: Login
  },
  {
    path: 'auth/register',
    component: Register
  }
] as Routes
