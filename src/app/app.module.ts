import { KeycloakService } from './service/keycloak.service';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

/**
 * Função para específicar como capturar o token -> KeycloakService.auth.authz.token
 * @param http 
 * @param options 
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => KeycloakService.auth.authz.token),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    KeycloakService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }