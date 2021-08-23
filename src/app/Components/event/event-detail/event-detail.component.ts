import { BalanceService } from './../../balance/balance.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TransactionService } from './../../transaction/transaction.service';
import { HomeService } from './../../../views/home/home.service';
import { Subscription } from 'rxjs';
import { EventService } from './../event.service';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Event } from '../event.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer !: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  userType: string = '';
  id !: number;
  event : any;
  eventSubscription !: Subscription;
  play : boolean = false;
  available : boolean = true;
  status : boolean = false;

  constructor(
    private eventService : EventService,
    private router: Router,
    private route: ActivatedRoute,
    private homeService : HomeService,
    private transactionService : TransactionService,
    private activeRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private authService : AuthService,
    private balanceService : BalanceService
  ) {}

  ngAfterViewInit(): void {

  }

  addResizeEvent(){
    if(this.available){
      this.onResize();
      window.addEventListener('resize', this.onResize);
    }
  }

  onResize = (): void => {
    this.videoWidth = Math.min(this.videoPlayer.nativeElement.clientWidth, 1277);
    this.videoHeight = 450;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.authService.userType.subscribe(value => this.userType = value);

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.activeRoute.pathFromRoot[1].url.subscribe(
      val => {
        this.play = ( val!= undefined && val.length > 2 && val[2].path == 'play')
      }
    );

    this.getEvent()
  }

  getEvent(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.eventSubscription = this.eventService.getEvent(this.id, this.play ? "/play" : "").subscribe(
      (response) => {
        this.event = response;
        this.available = this.event.available;
        if(this.available)
          this.addResizeEvent();

        if(this.event.eventStatus.id==1)
          this.status=true;
      },
      (error) =>{
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }


  ngOnDestroy(){
    if(this.eventSubscription)
      this.eventSubscription.unsubscribe();
  }
    
  flipCard(){
    if(!this.authService.isLoggedIn())
        this.router.navigate(['login']);

    (<HTMLInputElement>document.getElementById("cardFlip")).classList.toggle('flipped')
  }
  
  buyTicket(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.eventSubscription = this.transactionService.buyTicket(this.id).subscribe(
      (response) => {
        this.balanceService.getUserBalance();
        this.balanceService.setAnimate(true);
        this.router.navigateByUrl('/account/(accountRoute:transaction)');
      },
      (error) =>{
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

}
