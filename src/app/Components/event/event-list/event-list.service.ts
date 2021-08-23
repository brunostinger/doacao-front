import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../event.model';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  private readonly baseUrL = `${environment.API}event` ;

  constructor(private http: HttpClient) {}

  getEventsToManage(page : number, limit : number, filters : any){
    return this.http.get<Event[]>(`${this.baseUrL}/manage/list/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(filters))}`).pipe(take(1));
  }

  getEvents(page : number, limit : number, filters : any){
    return this.http.get<Event[]>(`${this.baseUrL}/list/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(filters))}`).pipe(take(1));
  }


  getSubscribedEvents(page : number, limit : number){
    return this.http.get<Event[]>(`${this.baseUrL}/list/subscribed/${page}/${limit}`).pipe(take(1));
  }
}
