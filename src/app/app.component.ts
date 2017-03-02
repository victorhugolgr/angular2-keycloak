import { Http } from '@angular/http';
import { KeycloakService } from './service/keycloak.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private http : Http,private kc : KeycloakService){}

  logout(){
    this.kc.logout();
  }

  loadUserInfo(){
    this.kc.getLoadUserInfo();
  }

  getServiceRest(){
    this.http.get('http://localhost:8091/api/mngt/info')
      .subscribe(()=>{console.log('Rest consultado')});
  }

  getServiceRestPublic(){
    this.http.get('http://localhost:8091/api/info')
      .subscribe(()=>{console.log('Rest consultado')});
  }

  getToken(){
    this.kc.getToken().then((token)=>console.log(token));
  }
}
