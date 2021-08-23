import { NotifyService } from './../../common/notify/notify.service';
import { AccountSubheaderService } from './../../Template/account-subheader/account-subheader.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from './../../../views/home/home.service';
import { EventListService } from './../event-list/event-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-edit-list',
  templateUrl: './event-edit-list.component.html',
  styleUrls: ['./event-edit-list.component.css']
})
export class EventEditListComponent implements OnInit {
  limit : number = 16;
  eventSubscription !: Subscription;
  events : any[] = [];
  page : number = 0;
  form !: FormGroup;

  constructor(
    private eventListService : EventListService,
    private homeService : HomeService,
    private  formBuilder: FormBuilder,
    private router: Router,
    private subheaderService: AccountSubheaderService,
    private notifyService : NotifyService,

  ) { }

  ngOnInit(): void {
    this.subheaderService.setTitle('Gerenciar eventos');
    this.form = this.formBuilder.group({
      name: [""],
      date:[""],
      status:[null]
    });
  }

  ngOnDestroy(){
    if(this.eventSubscription)
      this.eventSubscription.unsubscribe();
  }

  onScroll() {
    this.getEventsToManage()
  }

  getEvents(){
    this.events = [];
    this.page=0;
    this.limit=16;
    this.getEventsToManage();
  }

  getEventsToManage(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.eventSubscription = this.eventListService.getEventsToManage(this.page , this.limit, this.form.getRawValue()).subscribe(
      (response) => {
        if(!this.events || this.events.length==0)
           this.events = response;
        else{
          for(var i = 0; i < response.length ; i++){
            this.events.push(response[i]);
          }
        }

        if(response.length==0 && this.events.length==0)
          this.notifyService.notifyError("Nenhum evento encontrado");

        this.page ++;
      },
      (error) =>{
        
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  eventDetails(id: number){
    this.router.navigateByUrl('/account/(accountRoute:new-event/'+id+')');
  }

  newEvent(){
    this.router.navigateByUrl('/account/(accountRoute:new-event)');
  }

}
