import { AuthService } from './../login/auth.service';
import { Router } from '@angular/router';
import { AccountSidebarService } from './../Template/account-sidebar/account-sidebar.service';
import { Subscription } from 'rxjs';
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { AccountSubheaderService } from '../Template/account-subheader/account-subheader.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {

  userSubscription !: Subscription;
  balance !: any;
  userType: string = '';

  constructor(
    private subheaderService: AccountSubheaderService,
    private userService : UserService,
    private router: Router,
    private authService : AuthService,

  ) { }

  ngOnInit() {
    this.authService.userType.subscribe(value => this.userType = value);
    this.subheaderService.setTitle('Resumo da conta');
    this.getUser();
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
  
  getUser(){
    //setTimeout(() => {this.accountSidebarService.blockPage()}, 0)
    this.userSubscription = this.userService.getUser().subscribe(
      (user) => {
        this.balance = user.balance
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      //setTimeout(() => {this.accountSidebarService.unblockPage()}, 0)
    });
  }

}
