import { AccountSubheaderService } from './../../Template/account-subheader/account-subheader.service';
import { AccountSidebarService } from './../../Template/account-sidebar/account-sidebar.service';
import { Router } from '@angular/router';
import { EventListService } from './../../event/event-list/event-list.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reward-read',
  templateUrl: './reward-read.component.html',
  styleUrls: ['./reward-read.component.css']
})
export class RewardReadComponent implements OnInit {
  eventSubscription !: Subscription;
  events : any[] = [];
  page : number = 0;
  limit : number = 16;

  constructor(
    private eventListService : EventListService,
    private router: Router,
    private accountSidebarService: AccountSidebarService,
    private subheaderService: AccountSubheaderService
  ) { }

  ngOnInit(): void {
    this.subheaderService.setTitle('Ingressos');
    this.getSubscribedEvents();
  }

  ngOnDestroy(){
    if(this.eventSubscription)
      this.eventSubscription.unsubscribe();
  }

  getSubscribedEvents(){
    setTimeout(() => {this.accountSidebarService.blockPage()}, 0)
    this.eventSubscription = this.eventListService.getSubscribedEvents(this.page , this.limit).subscribe(
      (response) => {
        if(!this.events || this.events.length==0)
           this.events = response;
        else{
          for(var i = 0; i < response.length ; i++){
            this.events.push(response[i]);
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
      this.getSubscribedEvents()
  }

  eventDetails(id: number){
      this.router.navigate(['/event/'+id+'/play']);
  }
}
