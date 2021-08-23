import { NotifyService } from './../../common/notify/notify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Organization } from './../organization.model';
import { HomeService } from './../../../views/home/home.service';
import { OrganizationService } from './../organization.service';
import { Router } from '@angular/router';
import { OrganizationListService } from './organization-list.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
 
  moreOrg : Organization = { 
    "id": 0,
    "name": "Veja todas as opções",
    "profileImage": "../../../assets/img/arrow-right-square.svg",
  }

  
  @Input() name : any;
  @Input() city : any;
  @Input() category : any;
  @Input() search !: boolean;


  @Input()
  id: number = 0;

  @Input()
  limit : number = 16;

  orgSubscription !: Subscription;
  orgs : any[] = [];
  page : number = 0;
  form = this.formBuilder.group({
    name: [ null ],
    city:[ null],
    category:[ null]
  });

  constructor(
    private organizationListService : OrganizationListService,
    private router: Router,
    private organizationService : OrganizationService,
    private homeService : HomeService,
    private  formBuilder: FormBuilder,
    private notifyService : NotifyService,

  ) { }

  ngOnInit(): void {
    if(this.id==0){
      this.getOrgs(this.page, this.limit);
    }
    else{
      this.getOrg();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search'] && changes['search'].currentValue!=undefined) {
      this.orgs = [];
      this.page=0;
      this.limit=16;
      this.getOrgs(this.page, this.limit);
    }
  }

  ngOnDestroy(){
    if(this.orgSubscription)
      this.orgSubscription.unsubscribe();
  }

  getOrg(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.orgSubscription = this.organizationService.getOrg(this.id).subscribe(
      (response) => {
          this.orgs.push(response);
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  getOrgs(page: number,  limit : number){
    this.form.patchValue({
      name: this.name, 
      city: this.city, 
      category: this.category, 
    });

    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.orgSubscription = this.organizationListService.getOrgs(page , limit,  this.form.getRawValue()).subscribe(
      (response) => {
        if(!this.orgs || this.orgs.length==0)
           this.orgs = response;
        else{
          for(var i = 0; i < response.length ; i++){
            this.orgs.push(response[i]);
          }
        }
        if(limit!=16)
          this.orgs.push(this.moreOrg);

        if(response.length==0 && this.orgs.length==0)
          this.notifyService.notifyError("Nenhuma instituição encontrada");


        this.page ++;
      },
      (error) =>{
        this.router.navigate(['/error']);
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  onScroll() {
    if(this.id==0 && this.limit==16)
      this.getOrgs(this.page,  this.limit)
  }

  orgDetails(id: number){
    if(id==0)
      this.router.navigate(['/organization']);
    else
      this.router.navigate(['/organization/'+id]);
  }
}
