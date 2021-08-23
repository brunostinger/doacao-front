import { EventListService } from './event-list/event-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() name = "" 
  @Input() date = "" 
  @Input() price = "" 

  clicked !: boolean;

  constructor(
    private  formBuilder: FormBuilder,
    private eventListService: EventListService
  ){ }

  ngOnInit(): void {
  }

  searchEvents(){
    this.clicked = !this.clicked;
  }

}
