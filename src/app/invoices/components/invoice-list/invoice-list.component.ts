import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '../../interfaces/invoice.interface';
import { UIService } from '../../../shared/services/ui.service';
import { InvoiceItemComponent } from '../invoice-item/invoice-item.component';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  standalone: true,
  imports: [InvoiceItemComponent]
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices!: Invoice[];
  activeFilter: string = '';

  constructor(private uiService: UIService) {}

  ngOnInit(): void {
    this.uiService.activeFilter.subscribe(
      (filter) => (this.activeFilter = filter)
    );
  }
}
