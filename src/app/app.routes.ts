import { Routes } from '@angular/router';
import { HomeComponent } from './invoices/pages/home/home.component';
import { InvoiceComponent } from './invoices/pages/invoice/invoice.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'invoices', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
