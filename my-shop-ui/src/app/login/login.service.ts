import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { AuthServerProvider } from '../shared/auth/auth-jwt.service';
import { LocalStorageService, SessionStorageService } from '../shared/services';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL = SERVER_API_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authServerProvider: AuthServerProvider,
    private $sessionStorageService: SessionStorageService,
    private $localStorageService: LocalStorageService
  ) { }

  getAuthenticate(credentials: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe({
        next: (jwt: string) => {
          this.login(credentials).subscribe({
            next: (res) => resolve(res),
            error: (err) => reject(err)
          });
        },
        error: (error) => {
          this.logout();
          reject(error);
        }
      });
    });
  }

  login(credentials: any): Observable<HttpResponse<any>> {
    return this.http.post(this.baseURL + 'login', credentials, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => this.convertResponse(response)));
  }

  logout(): void {
    this.$localStorageService.clear();
    this.$sessionStorageService.clear();
    this.router.navigate(['']);
  }


  private convertResponse(res: any): any {
    const body: any = this.convert(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: HttpResponse<any[]>): HttpResponse<any[]> {
    const jsonResponse: any[] = res.body ?? [];
    const body: any[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convert(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object.
   */
  private convert(res: any): any {
    const copy: any = Object.assign({}, res);
    return copy;
  }

}
