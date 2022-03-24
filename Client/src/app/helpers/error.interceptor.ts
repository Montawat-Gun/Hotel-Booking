import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            if ((err.status === 400 || err.status === 404) && err.error) {
                this.messageService.add({ severity: 'error', summary: err.error.error_description || err.error });
            }
            if (err.status === 500) {
                this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด' });
            }
            return throwError(err.error);
        }))
    }
}