import { HttpClient, HttpParams } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  invoiceToEdit: Invoice | null = null;
  refreshInvoices$ = new Subject();
  statusCatalog = new BehaviorSubject(['Paid', 'Draft', 'Pending']);
  invoiceCounter = 0;
  activeFilter : any = null

  constructor(private http: HttpClient) {}

  createInvoice(item: any): Observable<any> {
     return this.http.post<any>(`${environment.base_url}${environment.invoice_endpoint}`, item);
  }
 
  getInvoices(status? : string): Observable<any[]> {
   let params = new HttpParams();
   if (status) {
     params = params.append('status', status);
   }
   return this.http.get<Invoice[]>(
      `${environment.base_url}${environment.invoice_endpoint}`,
      { params }
    );    
  }
 
  getInvoice(id: string  | any): Observable<any> {
      return this.http.get<Invoice>(
         `${environment.base_url}${environment.invoice_endpoint}/${id}`
       );
   }

  updateInvoice(id: number | any, item: any): Observable<any> {
     return this.http.put<any>(`${environment.base_url}${environment.invoice_endpoint}/${id}`, item);
  }
 
  deleteInvoice(id: number | any): Observable<any> {
     return this.http.delete<any>(`${environment.base_url}${environment.invoice_endpoint}/${id}`);
  }
}
