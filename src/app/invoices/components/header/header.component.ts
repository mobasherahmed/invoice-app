import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { UIService } from '../../../shared/services/ui.service';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class HeaderComponent implements OnInit {
  @Output() filter = new EventEmitter<string | null>();
  filters: Filter[] = [];

  constructor(
    private uiService: UIService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceService.statusCatalog.subscribe(data => {
      this.filters = ['Paid', 'Draft', 'Pending'].map((item: string) => ({
        name: item,
        checked: this.activeFilter === item
      }));
    })

    this.invoiceService.refreshInvoices$.subscribe(() => {
      this.filters.map(filter => filter.checked = false)
    })
  }

  toggleFilter(filterName: string, idx: number): void {
    this.filters[idx].checked = !this.filters[idx].checked;

    if (this.filters[idx].checked) {
      this.filter.emit(filterName);
    } else {
      this.filter.emit(null);
    }

    this.filters.map((f) => {
      if (f.name !== filterName) {
        f.checked = false;
      }
    });
  }

  showFilter(): void {
    this.uiService.toggleFilter();
  }

  closeFilter(event: any): void {
    this.uiService.closeFilter(event);
  }

  toggleForm(): void {
    this.uiService.toggleForm();
    this.invoiceService.invoiceToEdit = null;
  }

  get activeFilter() {
    return this.invoiceService.activeFilter;
  }

  get counter() {
    return this.invoiceService.counter();
  }

  get openFilter() {
    return this.uiService.openFilter;
  }
}

interface Filter {
  name: string;
  checked: boolean;
}
