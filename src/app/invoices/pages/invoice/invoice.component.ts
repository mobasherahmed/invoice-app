import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../shared/services/modal.service';
import { UIService } from '../../../shared/services/ui.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  standalone: true,
  imports:[CommonModule,ModalComponent,RouterLink]
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoice!: Invoice;
  activatedRoute$!: Subscription;
  refreshInvoices$!: Subscription;
  updateInvoices$!: Subscription;
  deleteInvoices$!: Subscription;
  isAdmin: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    private router: Router,
    private uiService: UIService,
    private toastrService: ToastrService,
    private titleService: Title,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute$ = this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.invoiceService.getInvoice(id)))
      .subscribe((invoice) => {
        this.invoice = invoice
        this.setTitle()
      });

    this.refreshInvoices$ = this.invoiceService.refreshInvoices$
      .pipe(switchMap(() => this.invoiceService.getInvoice(this.invoice._id)))
      .subscribe((invoice) => this.invoice = invoice);

    this.isAdmin = this.authService.isAdmin();
  }

  markAsPaid(): void {
    this.invoice.status = 'Paid'
    const {_id, __v, ...rest} = this.invoice
    this.updateInvoices$ = this.invoiceService.updateInvoice(this.invoice._id, rest)
      .subscribe(() => this.toastrService.success('Invoice updated successfully'))
  }

  openModal(): void {
    this.modalService.open();
  }

  closeModal(): void {
    this.modalService.close();
  }

  handleEdit(): void {
    this.uiService.toggleForm();
    this.invoiceService.invoiceToEdit = this.invoice;
  }

  handleDelete(): void {
    this.deleteInvoices$ = this.invoiceService.deleteInvoice(this.invoice._id)
      .subscribe(() => {
        this.toastrService.success('Invoice deleted successfully')
        this.modalService.close();
        this.router.navigate(['/invoices']);
      })
  }

  setTitle(): void {
    const id = this.invoice._id?.substring(0,6).toUpperCase()
    this.titleService.setTitle(`Invoice | #${id}`)
  }

  ngOnDestroy(): void {
    this.activatedRoute$?.unsubscribe();
    this.refreshInvoices$?.unsubscribe();
    this.updateInvoices$?.unsubscribe();
    this.deleteInvoices$?.unsubscribe();
  }
}
