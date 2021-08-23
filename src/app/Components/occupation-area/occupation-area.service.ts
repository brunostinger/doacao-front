import { take } from 'rxjs/operators';
import { Generic } from './../common/generic.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupationAreaService {
  private readonly baseUrL = `${environment.API}occupationarea` ;

  constructor(
    private http: HttpClient
  ) { }

  getOccupationAreas(){
    return this.http.get<Generic[]>(`${this.baseUrL}/list`).pipe(take(1));
  }
}
