import { HttpService } from './service/http.service';
import { KeycloakService } from './service/keycloak.service';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import {AppComponent} from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    KeycloakService,
    {
      provide: Http,
      useFactory:
      (
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        keycloakService: KeycloakService
      ) => new HttpService(backend, defaultOptions, keycloakService),
      deps: [XHRBackend, RequestOptions, KeycloakService]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}