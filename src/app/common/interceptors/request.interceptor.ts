import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()

export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('devgroceryToken')) {
            const JWT = JSON.parse(localStorage.getItem('devgroceryToken'));
            if (JWT && JWT.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${JWT.token}`
                    }
                });
            }
        }
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                }
            },
                error => {
                    if (error instanceof HttpResponse) {
                        console.log('error in calling API : ', error);
                    }
                    if (error.status) {
                        if (error.status === 401) {
                            localStorage.removeItem('devgroceryToken');
                            this.router.navigate(['/']);
                        }
                    }
                }
            )
        );
    }
}
