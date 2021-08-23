import { CalendarOptions } from '@fullcalendar/angular';
import { Component } from '@angular/core';  

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{
  Events : any = [];
  calendarOptions!: CalendarOptions;
  
  constructor() { }
  ngOnInit(){
  

    
  } 
  
  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }
}