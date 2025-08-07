import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { LoginComponent } from './app/components/login/login.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { VillaListComponent } from './app/components/villas/villa-list.component';
import { AddVillaComponent } from './app/components/add-villa/add-villa.component';
import { RegisterComponent } from './app/components/register/register.component';
import { HomeComponent } from './app/components/home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./app/components/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./app/components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./app/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'villas', loadComponent: () => import('./app/components/villas/villa-list.component').then(m => m.VillaListComponent) },
  { path: 'add-villa', loadComponent: () => import('./app/components/add-villa/add-villa.component').then(m => m.AddVillaComponent) },
  { path: '**', redirectTo: '/home' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));
