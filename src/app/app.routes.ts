import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent) },
    { path: 'invoices', loadComponent: () => import('./invoices/pages/home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
    { path: 'invoice/:id', loadComponent: () => import('./invoices/pages/invoice/invoice.component').then(m => m.InvoiceComponent), canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
