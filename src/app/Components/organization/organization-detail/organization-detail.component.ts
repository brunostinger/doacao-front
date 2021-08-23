import { BalanceService } from './../../balance/balance.service';
import { TransactionService } from './../../transaction/transaction.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrganizationService } from './../organization.service';
import { HomeService } from './../../../views/home/home.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  CURRENCY_MASK= {mask: Number, scale:2, thousandsSeparator:'.', padFractionalZeros: true, signed: false, radix: ','}
  PHONE_MASK : any= {mask : [{length : 10,mask : '(00) 0000-0000'},{length: 11, mask : '(00) 0 0000-0000'}]};
  userType: string = '';
  id !: number;
  organization : any;
  organizationSubscription !: Subscription;
  form !: FormGroup;
  loading : Boolean = false;
  donationSubscription !: Subscription;

  constructor(
    private organizationService : OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private homeService : HomeService,
    private  formBuilder: FormBuilder,
    private transactionService : TransactionService,
    private authService : AuthService,
    private balanceService : BalanceService
  ) {}

  ngOnInit(): void {
    this.authService.userType.subscribe(value => this.userType = value);

    const currentDate = new Date()
    const currenYear = currentDate.getFullYear()
    const ones_number = currenYear % 10
    const tens_number = Math.floor(currenYear % 100 / 10)

    const EXPIRED_CARD_TEST   = '^((0[1-9])|(1[0-2]))\/?((' + tens_number + '[' + ones_number + '-9])|([' + (tens_number + 1) + '-9][0-9]))$'
  

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.organizationSubscription = this.organizationService.getOrg(this.id).subscribe(
      (response) => {
        this.organization = response;
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });


    this.form = this.formBuilder.group({
      toUser : [this.id, [Validators.required]],
      value: [null, [Validators.required,Validators.min(1)]], 
      cardNumber: [null, [Validators.required, Validators.minLength(16),Validators.maxLength(16)]], 
      expiration: [null, [Validators.required, Validators.minLength(4),Validators.maxLength(4), Validators.pattern(EXPIRED_CARD_TEST)]], 
      securityCode: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/), , Validators.minLength(3),Validators.maxLength(3)]], 
      owner: [ null, [Validators.required, Validators.minLength(3)]], 
      uniqueId: [null, [Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/)]], 
    });

  }

  ngOnDestroy(){
    if(this.organizationSubscription)
      this.organizationSubscription.unsubscribe();

    if(this.donationSubscription)
      this.donationSubscription.unsubscribe();
  }

  
  donate(){
    this.form.controls["value"].updateValueAndValidity();

    if(this.form.controls['value'].invalid)
        return;

    if(!this.authService.isLoggedIn())
        this.router.navigate(['login']);

     this.flipCard();
  }
  
  flipCard(){
    (<HTMLInputElement>document.getElementById("cardFlip")).classList.toggle('flipped')
  }
  
  onSubmit(){
    if (this.form.invalid) {
      return;
    }
  
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.loading = true;

    this.donationSubscription = this.transactionService.donate(this.form.getRawValue()).subscribe(
        (response) => {
          this.balanceService.getUserBalance();
          this.balanceService.setAnimate(true);
          this.router.navigateByUrl('/account/(accountRoute:transaction)');
        },
        (error) =>{

        },
      ).add(() => {
        this.loading = false;
        setTimeout(() => {this.homeService.unblockPage()}, 0)
      });
    }

}
