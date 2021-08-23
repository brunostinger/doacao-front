import { SnotifyService } from 'ng-snotify';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private snotifyService: SnotifyService
  ) { }

  notifyErrors(list : any){
    list.forEach((error: { defaultMessage: string; }) => {
      this.notifyError(error.defaultMessage);
    });
  }

  notifyError(message : string){
    this.snotifyService.error(message, 'Erro');
  }

  notifySuccess(message : string){
    this.snotifyService.success(message);
  }
}
