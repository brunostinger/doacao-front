import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from './../event.service';
import { Subscription } from 'rxjs';
import { HomeService } from './../../../views/home/home.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountSubheaderService } from './../../Template/account-subheader/account-subheader.service';
import { Component, OnInit } from '@angular/core';
import { Generic } from '../../common/generic.model';
import { Event } from '../event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  form !: FormGroup;
  loading !: Boolean;
  id : number =0;

  eventSubscription !: Subscription;


  constructor(
    private  formBuilder: FormBuilder,
    private subheaderService: AccountSubheaderService, 
    private homeService : HomeService,
    private eventService : EventService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe : DatePipe 
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.form = this.formBuilder.group({
      id: [this.id],
      name: [null, [Validators.required, Validators.minLength(5) , Validators.maxLength(145)]], 
      description: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]], 
      tscheduleDate: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]], 
      scheduleTime: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]], 
      duration: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(14)]],
      value: [null, [Validators.required,Validators.min(1)]], 
      status: [null, [Validators.required]], 
      coverImage: [null, [Validators.required,Validators.min(1), Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]], 
      link: [null, [Validators.required, Validators.minLength(4)]], 
    });

    if(this.id==undefined || this.id==0)
      this.subheaderService.setTitle('Novo evento');
    else{
      this.subheaderService.setTitle('Editar evento');
      this.getEventToManage();
    }
  }

  updateForm(event : Event){
    this.form.patchValue({
      id:event.id,
      name: event.name, 
      description: event.description, 
      tscheduleDate: event.scheduleDate, 
      scheduleTime: event.scheduleDate, 
      duration: event.duration,
      value: event.value, 
      status: event.eventStatus?.id, 
      coverImage: event.coverImage, 
      link: event.link,  
    });

    this.form.controls['tscheduleDate'].setValue(this.datePipe.transform(event.scheduleDate, 'yyyy-MM-dd'))
    this.form.controls['scheduleTime'].setValue(this.datePipe.transform(event.scheduleDate, 'HH:mm'))

  }
  
  getEventToManage(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.eventSubscription = this.eventService.getEventToManage(this.id).subscribe(
      (response) => {
        this.updateForm(response);
      },
      (error) =>{
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  
  ngOnDestroy(){
    if(this.eventSubscription)
      this.eventSubscription.unsubscribe();
  }


  saveEvent(){
    if(this.id==undefined || this.id==0)
      this.addEvent();
    else
    this.updateEvent();

  }

  updateEvent(){
    if (this.form.invalid){
      return;
    }

    var generic : Generic = {};
    generic.id = this.form.get("status")?.value;

    if(this.form.get("eventStatus")!=null)
      this.form.removeControl("eventStatus")
    
    this.form.addControl(
      'eventStatus', new FormControl(generic),
    );

    if(this.form.get("scheduleDate")!=null)
      this.form.removeControl("scheduleDate")

    this.form.addControl(
      'scheduleDate', new FormControl(this.form.get("tscheduleDate")?.value +" " + this.form.get("scheduleTime")?.value),
    );

    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.loading = true;
    this.eventSubscription = this.eventService.updateEvent(this.form.getRawValue()).subscribe(
      (response) => {
        this.router.navigate(['/event/'+response.id]);
      },
      (error) =>{
      },
    ).add(() => {
      this.loading = false;
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  addEvent(){
    if (this.form.invalid){
      return;
    }
    var generic : Generic = {};
    generic.id = this.form.get("status")?.value;

    if(this.form.get("eventStatus")!=null)
      this.form.removeControl("eventStatus")
    
    this.form.addControl(
      'eventStatus', new FormControl(generic),
    );

    if(this.form.get("scheduleDate")!=null)
      this.form.removeControl("scheduleDate")

    this.form.addControl(
      'scheduleDate', new FormControl(this.form.get("tscheduleDate")?.value +" " + this.form.get("scheduleTime")?.value),
    );

    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.loading = true;
    this.eventSubscription = this.eventService.createEvent(this.form.getRawValue()).subscribe(
      (response) => {
        this.router.navigate(['/event/'+response.id]);
      },
      (error) =>{
      },
    ).add(() => {
      this.loading = false;
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

}
