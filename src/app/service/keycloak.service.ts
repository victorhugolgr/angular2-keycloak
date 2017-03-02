import { Injectable } from "@angular/core";


declare var Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: any = {};
    
    /**
     * Método de inicialização da segurança.
     */
    static init(): Promise<any> {
        let keycloak = Keycloak('keycloak/keycloak.json');
        KeycloakService.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            keycloak.init({ onLoad: 'login-required' })
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloak;
                    KeycloakService.auth.logoutUrl = keycloak.authServerUrl + "/realms/TRE/protocol/openid-connect/logout?redirect_uri=http://localhost:4200";

                    // refresh login
                    setInterval(function () {

                        keycloak.updateToken(70).success(function (refreshed) {
                            if (refreshed) {
                                console.log('Token refreshed');
                            } else {
                                console.log('Token not refreshed, valid for '
                                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                            }
                        }).error(function () {
                            console.error('Failed to refresh token');
                        });

                    }, 60000);

                    console.log("Loading...");

                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }
    
    /**
     * Método de logout
     */
    logout() {
        console.log('*** LOGOUT');
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;

        window.location.href = KeycloakService.auth.logoutUrl;
    }

    getToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (KeycloakService.auth.authz.token) {
                KeycloakService.auth.authz.updateToken(5)
                    .success(() => {
                        resolve(<string>KeycloakService.auth.authz.token);
                    })
                    .error(() => {
                        reject('Failed to refresh token');
                    });
            }
        });
    }

    getLoadUserInfo(){
        KeycloakService.auth.authz.loadUserInfo().success(function(userInfo) {
            console.log(userInfo);
        }).error(function() {
            console.log('Failed to load user info');
        })
    }
}