import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { BasComponent } from './bas/bas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path:'about',component:AboutComponent },
  { path: 'cart', component: CartComponent ,
  children: [
    { path: 'home', component: HomeComponent },
  ]},
  { path: 'bas', component: BasComponent },
  { path: '**', redirectTo: 'login' } // Wildcard route for a 404 page
];


