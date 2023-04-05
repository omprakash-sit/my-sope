import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from '../services';
import { SERVER_API_URL } from '../../app.constants';
// import { JhiEventManager } from 'ng-jhipster';
@Injectable()
export class AuthServerProvider {
    private baseURL = SERVER_API_URL;
    constructor(
        private http: HttpClient,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService,
        // private eventManager: JhiEventManager,
    ) { }

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    login(credentials: any): Observable<any> {
        return this.http.post(this.baseURL + 'authenticate', credentials, { observe: 'response' })
            .pipe(map((response: HttpResponse<any>) => this.authenticateSuccess(response, credentials.rememberMe)));
    };

    storeAuthenticationToken(jwt: string, rememberMe?: boolean) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', jwt);
        } else {
            this.$sessionStorage.store('authenticationToken', jwt);
        }
    }

    logout(): Observable<any> {
        return new Observable((observer) => {
            this.$localStorage.remove('authenticationToken');
            this.$sessionStorage.remove('authenticationToken');
            this.$sessionStorage.clear();
            observer.complete();
        });
    }
    private authenticateSuccess(response: any, rememberMe?: boolean): string | void {
        const bearerToken = response.body['id_token'];
        if (bearerToken) {
            this.storeAuthenticationToken(bearerToken, rememberMe);
            return bearerToken;
        }
        // const bearerToken = response.headers.get('Authorization');
        // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        //     const jwt = bearerToken.slice(7, bearerToken.length);
        //     // this.storeAuthenticationToken(jwt, rememberMe);
        //     return jwt;
        // }
    }
}
