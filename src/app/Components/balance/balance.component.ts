import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BalanceService } from './balance.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balanceSubscription !: Subscription;
  loggedSubscription !: Subscription;
  animateSubscription !: Subscription;

  user !: User;
  logged : boolean = false;
  animateType : number = 0;
  animate : boolean = false;
  userType: string = '';

  constructor(
    private balanceService : BalanceService,
    private authService : AuthService,
  ) { }

  setLogged(value:boolean){
    this.logged=value;
  }

  ngOnInit(): void {
    this.authService.userType.subscribe(value => this.userType = value);

    this.balanceService.loggedSub.subscribe(value => {
      this.setLogged(value);
      if(this.authService.isLoggedIn())
          this.getUserBalance();
    });

    this.balanceService.animateSub.subscribe(value => {
      if(value)
        this.animateType = 1
    });

    this.balanceService.userSub.subscribe(user => {
      if(!this.authService.isLoggedIn()){
        this.setLogged(false);
        return;
      }
      else{
        
        this.setLogged(true);
        this.user = user;
      }
    });
  }

  ngOnDestroy(){
    if(this.balanceSubscription){
      this.balanceSubscription.unsubscribe();
    }
    if(this.loggedSubscription){
      this.loggedSubscription.unsubscribe();
    }
    if(this.animateSubscription){
      this.animateSubscription.unsubscribe();
    }
  }

  getUserBalance(){
    this.balanceService.getUserBalance();
  }

}
