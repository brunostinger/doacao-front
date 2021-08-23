import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  @BlockUI('block-main') blockUI !: NgBlockUI;
  loading !: Boolean;
  loadingChange: Subject<boolean> = new Subject<boolean>();
  
  constructor(){
    this.loadingChange.subscribe((value) => {
      this.loading = value;
    });
  }

  blockPage(){
      this.loadingChange.next(!this.loading);
      this.blockUI.start('');
  }

  unblockPage(){
    setTimeout(() => {
      this.blockUI.stop();
      this.loadingChange.next(!this.loading);
    }, 0);
  }


}
