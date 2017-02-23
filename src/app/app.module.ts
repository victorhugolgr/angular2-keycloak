import { Http } from '@angular/http';
import { HttpService } from './service/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,XHRBackend,RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { KeycloakService } from './service/keycloak.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [KeycloakService,

    {
      provide: Http,
      useFactory:
      (
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        keycloakService: KeycloakService
      ) => new HttpService(backend, defaultOptions, keycloakService),
      deps: [XHRBackend, RequestOptions, KeycloakService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
