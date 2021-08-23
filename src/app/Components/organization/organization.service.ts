import { take } from 'rxjs/operators';
import { Organization } from './organization.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private readonly baseUrL = `${environment.API}user/organization` ;
  constructor(private http: HttpClient) {}

  getOrg(id : number){
    return this.http.get<Organization>(`${this.baseUrL}/${id}`)
  }

  getOrgsLocartion(){
    return this.http.get<Organization[]>(`${this.baseUrL}/list/city`).pipe(take(1));
  }

}
