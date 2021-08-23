import { take } from 'rxjs/operators';
import { Transaction } from './transaction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Donation } from '../donation/donation.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly baseUrL = `${environment.API}transaction` ;

  constructor(private http: HttpClient) {}

  getTransactions(page : number, limit : number){
    return this.http.get<Transaction[]>(`${this.baseUrL}/list/${page}/${limit}`).pipe(take(1));
  }

  donate(donation : Donation){
    return this.http.post(this.baseUrL+'/donation/org',donation).pipe(take(1));
  }
  
  buyTicket(id : number){
    return this.http.post(`${this.baseUrL}/ticket/buy/${id}`,id).pipe(take(1));
  }

}
