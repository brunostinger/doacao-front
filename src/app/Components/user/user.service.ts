import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrL = `${environment.API}user` ;
  constructor(
    private http: HttpClient
  ) {}

  getUser(){
    return this.http.get<User>(this.baseUrL+'/info').pipe(take(1));
  }

  updateManagedUser(user: User) {
    return this.http.patch(this.baseUrL+'/manage',user).pipe(take(1));
  }

  editUser(user: User) {
    return this.http.patch(this.baseUrL,user).pipe(take(1));
  }

  createUser(user: User){
    return this.http.post(this.baseUrL,user).pipe(take(1));
  }

  getUsersToManage(page : number, limit : number, filters : any){
    return this.http.get<User[]>(`${this.baseUrL}/manage/list/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(filters))}`).pipe(take(1));
  }

  getUserToManage(id: number){
    return this.http.get<User>(`${this.baseUrL}/manage/info/${id}`).pipe(take(1));
  }

  
}
