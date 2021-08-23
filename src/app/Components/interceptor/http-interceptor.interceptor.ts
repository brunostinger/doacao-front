import { AuthService } from './../login/auth.service';
import { Router } from '@angular/router';
import { NotifyService } from './../common/notify/notify.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(
   private notifyService : NotifyService,
   private router: Router,
   private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (request.url.indexOf('viacep') ===-1) {
          request = request.clone({
            setHeaders: { 
              Authorization: `${this.authService.getAuth()}`     
            }
          });
      }  
      
      return next.handle(request).pipe(
        catchError(err => {
          if (err.status === 400) {
            if(typeof err.error.errors !== "undefined")
              this.notifyService.notifyErrors(err.error.errors);
          }else if(err.status==401){
            if(typeof err.error.errors!== "undefined")  
              this.notifyService.notifyErrors(err.error.errors);
            else
               this.notifyService.notifyError('Usuário ou senha inválidos');
          }else if(err.status==403){
            this.authService.deleteCookie();
            this.notifyService.notifyError('Acesse o site novamente');
            this.router.navigateByUrl('/login');
          }else{
            this.notifyService.notifyError('Erro desconhecido');
          }
          return throwError( err );
        }));
    }

}
