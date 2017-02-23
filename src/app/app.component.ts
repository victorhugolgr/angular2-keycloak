import { KeycloakService } from './service/keycloak.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private kc : KeycloakService){}

  logout(){
    this.kc.logout();
  }
}
