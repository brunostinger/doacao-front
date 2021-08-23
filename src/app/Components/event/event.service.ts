import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly baseUrL = `${environment.API}event` ;
  constructor(private http: HttpClient) {}

  getEvent(id : number, play:  string){
    return this.http.get<Event>(`${this.baseUrL}/${id}${play}`)
  }


  getEventToManage(id : number){
    return this.http.get<Event>(`${this.baseUrL}/manage/${id}`)
  }

  
  createEvent(event: Event){
    return this.http.post<Event>(`${this.baseUrL}/new`,event).pipe(take(1));
  }

  updateEvent(event: Event){
    return this.http.patch<Event>(`${this.baseUrL}/manage/update`,event).pipe(take(1));
  }

}
