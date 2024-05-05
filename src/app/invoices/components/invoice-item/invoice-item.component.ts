import { Component, Input } from '@angular/core';
import { Invoice } from '../../interfaces/invoice.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
  standalone: true,
  imports: [RouterModule,CommonModule]
})
export class InvoiceItemComponent {
  @Input() invoice!: Invoice;
  @Input() idx!: number;
}
