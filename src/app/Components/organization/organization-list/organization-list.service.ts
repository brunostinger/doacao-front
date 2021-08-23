import { take } from 'rxjs/operators';
import { Organization } from './../organization.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationListService {
  private readonly baseUrL = `${environment.API}user/organization` ;

  constructor(private http: HttpClient) {}

  getOrgs(page : number, limit : number, filters : any){
    return this.http.get<Organization[]>(`${this.baseUrL}/list/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(filters))}`).pipe(take(1));
  }
}
