import { AuthService } from './../login/auth.service';
import { Subscription } from 'rxjs';
import { TransactionService } from './transaction.service';
import { AccountSidebarService } from './../Template/account-sidebar/account-sidebar.service';
import { Component, OnInit } from '@angular/core';
import { AccountSubheaderService } from '../Template/account-subheader/account-subheader.service';
import { Router } from '@angular/router';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionSubscription !: Subscription;
  transactions !: Transaction[];
  page : number = 0;
  limit : number = 12;
  userType: string = '';


  constructor(
    private subheaderService: AccountSubheaderService, 
    private accountSidebarService: AccountSidebarService,
    private transactionService : TransactionService,
    private router: Router,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.authService.userType.subscribe(value => this.userType = value);
    this.subheaderService.setTitle('Transações');
    this.getTransactions(this.page, this.limit);
  }

  ngOnDestroy(){
    this.transactionSubscription.unsubscribe();
  }

  getTransactions(page: number,  limit : number){
    setTimeout(() => {this.accountSidebarService.blockPage()}, 0)
    this.transactionSubscription = this.transactionService.getTransactions(page , limit).subscribe(
      (response) => {

        if(!this.transactions || this.transactions.length==0)
           this.transactions = response;
        else{
          for(var i = 0; i < response.length ; i++){
            this.transactions.push(response[i]);
          }
        }
        this.page ++;
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      setTimeout(() => {this.accountSidebarService.unblockPage()}, 0)
    });
  }

  onScroll() {
    this.getTransactions(this.page,  this.limit)
  }

  openDest(type : any, userId : any, eventId : any){
      if(type==1)
        this.router.navigate(['/organization/'+userId]);
      else
        this.router.navigate(['/event/'+eventId+"/play"]);
  }
}
