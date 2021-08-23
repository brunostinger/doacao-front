import { NotifyService } from './../../common/notify/notify.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HomeService } from './../../../views/home/home.service';
import { EventService } from './../event.service';
import { EventListService } from './event-list.service';
import { Subscription } from 'rxjs';
import {Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Event } from '../event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  moreEvent : Event = { 
    "id": 0,
    "name": "Veja todas as opções",
    "coverImage": "../../../assets/img/arrow-right-square.svg",
  }

  @Input() name : any;
  @Input() date : any;
  @Input() price : any;
  @Input() search !: boolean;

  @Input()
  id: number = 0;

  @Input()
  limit : number = 16;

  eventSubscription !: Subscription;
  events : any[] = [];
  page : number = 0;
  form = this.formBuilder.group({
    name: [ null ],
    date:[ null],
    price:[ null]
  });

  constructor(
    private eventListService : EventListService,
    private router: Router,
    private eventService : EventService,
    private homeService : HomeService,
    private  formBuilder: FormBuilder,
    private notifyService : NotifyService,

  ) { }

  ngOnInit(): void {

    if(this.id==0){
      this.getEvents(this.page, this.limit);
    }
    else{
      this.getEvent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search'] && changes['search'].currentValue!=undefined) {
      this.events = [];
      this.page=0;
      this.limit=16;
      this.getEvents(this.page, this.limit);
    }
  }

  ngOnDestroy(){
    if(this.eventSubscription)
      this.eventSubscription.unsubscribe();
  }

  getEvent(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.eventSubscription = this.eventService.getEvent(this.id,"").subscribe(
      (response) => {
          this.events.push(response);
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  getEvents(page: number,  limit : number){
    this.form.patchValue({
      name: this.name, 
      date: this.date, 
      price: this.price, 
    });

    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.eventSubscription = this.eventListService.getEvents(page , limit, this.form.getRawValue()).subscribe(
      (response) => {
        if(!this.events || this.events.length==0)
           this.events = response;
        else{
          for(var i = 0; i < response.length ; i++){
            this.events.push(response[i]);
          }
        }
        if(limit!=16)
          this.events.push(this.moreEvent);

        if(response.length==0 && this.events.length==0)
          this.notifyService.notifyError("Nenhum evento encontrado");

        this.page ++;
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  onScroll() {
    if(this.id==0 && this.limit==16)
      this.getEvents(this.page,  this.limit)
  }

  eventDetails(id: number){
    if(id==0)
      this.router.navigate(['/event']);
    else
      this.router.navigate(['/event/'+id]);
  }
}
