import { NotifyService } from './../common/notify/notify.service';
import { BalanceService } from './../balance/balance.service';
import { Router } from '@angular/router';
import { HomeService } from '../../views/home/home.service';
import { first, take } from 'rxjs/operators';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user/user.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrL = `${environment.API}api/login` ;
  private readonly baseRecoverUrL = `${environment.API}user` ;
  userType: BehaviorSubject<string> = new BehaviorSubject<string>(this.getRole());

  constructor(
    private http: HttpClient,
    private homeService : HomeService,
    private cookieService: CookieService,
    private router: Router,
    private balanceService : BalanceService,
    private notifyService : NotifyService,
    private jwtHelperService: JwtHelperService
  ) { }

  getRole(){
    const token = this.getAuth();
    if(token==null)
      return null;

    const decodeToken = this.jwtHelperService.decodeToken(token);
    if (!decodeToken){
      return null;
    }
    return decodeToken['role'];
  }

  login(user: User){
    this.deleteCookie();

    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.http.post(this.baseUrL,user,httpOptions).pipe(first()).subscribe(
      (res: HttpResponse<any>) => {
        if (res.type === HttpEventType.Response){
            if(res.status==200){
              res.headers.keys();
              this.setSession(res);
              if(this.isLoggedIn())
                this.router.navigate(['account']);
            }
        }
      },
      (error) => {
      }).add(() => {
        setTimeout(() => {this.homeService.unblockPage()}, 0)
      });    
  }

  recoverPassword(user: User){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.http.put(`${this.baseRecoverUrL}/recover`,user,httpOptions).pipe(take(1)).subscribe(
      (res: HttpResponse<any>) => {
        if (res.type === HttpEventType.Response){
            if(res.status==202){
              this.notifyService.notifySuccess("Verifique os dados enviados por email informado");
            }else{
              this.notifyService.notifyError("Erro na solicitação");
            }
        }
      },
      (error) => {
      }).add(() => {
        setTimeout(() => {this.homeService.unblockPage()}, 0)
      });   
  }

  setSession(resp : HttpResponse<any>){
    const token = resp.headers.get('token');
    const expiresIn = resp.headers.get('expiresIn');
    if(token!= null && expiresIn!=null){
      const cookie = {
        "token": token,
        "expiresIn": expiresIn
      };
      this.cookieService.set('doacao', JSON.stringify(cookie), new Date(expiresIn), '/','localhost', false, "Lax");
      this.userType.next(this.getRole());
    }
  }

  isLoggedIn(){
    if(!this.cookieService.check('doacao')){
      this.deleteCookie();
      return false;
    }
      try {
        const cookie = JSON.parse(this.cookieService.get('doacao'));
        let logged =  moment().isBefore(cookie.expiresIn);
        if(!logged)
          this.deleteCookie();
        return logged;
      } catch (error) {
        this.deleteCookie();
        return false;
      }
  }

  getAuth(){
      try {
        const cookie = JSON.parse(this.cookieService.get('doacao'));
        return cookie.token;
      } catch (error) {
        return null;
      }
  }

  Logout() {
    this.userType.next('');
    this.deleteCookie();
    this.balanceService.setLogged(false);
    this.router.navigateByUrl('/home');
  }

  deleteCookie(){
    try {this.cookieService.delete('doacao');} catch (error) {console.log("err k1")}
    try {this.cookieService.delete('doacao', '/');} catch (error) {console.log("err k2")}
    try {this.cookieService.delete('doacao', '../');} catch (error) {console.log("err k3")}
    try {this.cookieService.delete('doacao', '/', 'localhost', false, 'Lax');} catch (error) {console.log("err k4")}
    try {this.cookieService.deleteAll('../');} catch (error) {console.log("err k5")}
    try {this.cookieService.deleteAll('./');} catch (error) {console.log("err k6")}
    try {this.cookieService.deleteAll();} catch (error) {console.log("err k7")}
  }

}
