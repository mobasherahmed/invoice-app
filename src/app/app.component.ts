import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIService } from './shared/services/ui.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { InvoiceFormComponent } from './invoices/components/invoice-form/invoice-form.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,InvoiceFormComponent,CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor( public uiService: UIService) {}

  get openForm() {
    return this.uiService.openForm;
  }
}
