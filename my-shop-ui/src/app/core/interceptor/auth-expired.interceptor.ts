import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../login/login.service';
@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap({
            error: (err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        const loginService: LoginService = this.injector.get(LoginService);
                        loginService.logout();
                    }
                }
            }
        })
        );
    }
}
