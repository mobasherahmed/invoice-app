import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { Toast, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ToastrModule.forRoot(
      {timeOut: 3000, positionClass: 'toast-top-right', preventDuplicates: true}))
    ]
};
