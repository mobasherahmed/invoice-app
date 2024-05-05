import { Routes } from '@angular/router';
import { HomeComponent } from './invoices/pages/home/home.component';
import { InvoiceComponent } from './invoices/pages/invoice/invoice.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'invoice/:id', component: InvoiceComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
