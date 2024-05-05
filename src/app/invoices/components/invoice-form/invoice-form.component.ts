import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UIService } from '../../../shared/services/ui.service';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { PaymentTerms } from '../../interfaces/catalog.interface';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  standalone: true,
  imports:[ReactiveFormsModule,FormsModule,CommonModule]
})
export class InvoiceFormComponent implements OnInit {
  form: FormGroup;
  showErrorMessage = false;
  invoiceStatus = 'Pending';
  title = 'Create Invoice';
  paymentTerms: PaymentTerms[] = [
    { id: 1, name: 'Net 1 Day' },
    { id: 2, name: 'Net 7 Days' },
    { id: 3, name: 'Net 14 Days' },
    { id: 4, name: 'Net 30 Days' }
  ];;
  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService
  ) {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street:   ['', Validators.required],
        city:     ['', Validators.required],
        postCode: ['', Validators.required],
        country:  ['', Validators.required],
      }),
      clientName:  ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientAddress: this.fb.group({
        street:   ['', Validators.required],
        city:     ['', Validators.required],
        postCode: ['', Validators.required],
        country:  ['', Validators.required],
      }),
      paymentDue:   ['', Validators.required],
      paymentTerms: [1, [Validators.required, Validators.min(1)]],
      description:  ['', [Validators.required, Validators.min(1)]],
      items: this.fb.array([], Validators.required),
    });
  }

  ngOnInit() {
    if (this.invoiceService.invoiceToEdit) {
      this.title = 'Edit #' + this.invoiceService.invoiceToEdit._id?.substring(0, 6).toUpperCase();
      this.invoiceService.invoiceToEdit.items.map(() => this.addItem());
      this.form.patchValue(this.invoiceService.invoiceToEdit);
    }
  }

  addItem(): void {
    const item: FormGroup = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: [null, [Validators.required]],
      total: [0],
    });
    this.invoiceItems.push(item);
  }

  deleteItem(id: number): void {
    this.invoiceItems.removeAt(id);
  }

  handleFormSubmit(): void {
    this.showErrorMessage = this.form.invalid;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newInvoice = this.form.value;
    newInvoice.createdAt = new Date();
    newInvoice.status = this.invoiceStatus
    newInvoice.total = 0;

    this.invoiceItems.value.map((item:any) => {
      item.total = item.quantity * item.price;
      newInvoice.total += item.total;
    });

    if (!this.invoiceService.invoiceToEdit) {
      this.invoiceService.createInvoice(newInvoice).subscribe(
        () => {
          this.invoiceService.activeFilter = null
          this.invoiceService.refreshInvoices$.next(true)
          this.uiService.closeForm();
          this.toastrService.success('Invoice created successfully')
        },
        (error) => this.toastrService.error(error.message)
      );
    } else {
      this.invoiceService
        .updateInvoice(this.invoiceService.invoiceToEdit._id, newInvoice)
        .subscribe(
          () => {
            this.invoiceService.refreshInvoices$.next(true)
            this.uiService.closeForm();
            this.toastrService.success('Invoice updated successfully')
          },
          (error) => this.toastrService.error(error.message)
        );
    }
  }

  saveAsDraft(): void {
    if (this.form.valid) {
      this.invoiceStatus = 'Draft';
    }
    this.handleFormSubmit();
  }

  closeForm(): void {
    this.uiService.closeForm();
  }
  
  get invoiceItems(): FormArray {
    return this.form.controls['items'] as FormArray;
  }

  get animateFormClose() {
    return this.uiService.animationCloseForm;
  }
}
