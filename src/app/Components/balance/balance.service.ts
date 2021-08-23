import { User } from './../user/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  user !: User;
  logged : boolean = false;
  animate : boolean = false;

  public userSub = new BehaviorSubject<User>(this.user);
  public loggedSub = new BehaviorSubject<boolean>(this.logged);
  public animateSub = new BehaviorSubject<boolean>(this.animate);

  private readonly baseUrL = `${environment.API}user` ;
  constructor(
    private http: HttpClient
  ) { }

  setAnimate(value:boolean){
    this.animateSub.next(value);
    this.animateSub.next(false);
  }

  setLogged(value:boolean){
    this.loggedSub.next(value);
  }

  getUserBalance(){
    return this.http.get<User>(`${this.baseUrL}/balance`).subscribe(user => {
      this.userSub.next(user);
  });
  
  }

}
