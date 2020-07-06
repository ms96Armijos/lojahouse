import { RegistroComponent } from './login/registro.component';
import { Pagina404Component } from './shared/pagina404/pagina404.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', component: Pagina404Component }
];

export const APP_ROUTES = RouterModule.forRoot( routes, {useHash: true});
