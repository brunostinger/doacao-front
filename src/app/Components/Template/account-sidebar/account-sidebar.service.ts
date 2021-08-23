import { HomeService } from './../../../views/home/home.service';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountSidebarService{
  @BlockUI('block-main') blockUI !: NgBlockUI;
  loading !: Boolean;
  loadingChange: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private homeService : HomeService
  ){
    this.loadingChange.subscribe((value) => {
      this.loading = value;
    });
  }

  blockPage(){
      setTimeout(() => {
        //this.loadingChange.next(!this.loading);
        this.blockUI.start('');
        this.homeService.loadingChange.next(!this.homeService.loading);
      }, 0);
  }

  unblockPage(){
    setTimeout(() => {
      this.blockUI.stop();
      //this.loadingChange.next(!this.loading);
      this.homeService.loadingChange.next(!this.homeService.loading);
    }, 0);
  }

  ngAfterViewInit(){

  }
}
