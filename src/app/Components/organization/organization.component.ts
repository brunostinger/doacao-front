import { OrganizationService } from './organization.service';
import { Organization } from './organization.model';
import { OccupationAreaService } from './../occupation-area/occupation-area.service';
import { Subscription } from 'rxjs';
import { Generic } from './../common/generic.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  @Input() name = "" 
  @Input() city = "" 
  @Input() category = "" 
  
  clicked !: boolean;

  areaSubscription !: Subscription;
  areas !: Generic[];

  locationSubscription !: Subscription;
  locations !: Organization[];

  constructor(
    private occupationAreaService : OccupationAreaService,
    private organizationService: OrganizationService
  ) { }

  ngOnInit(): void {
    this.getAreas();
    this.getOrgsLocartion();
  }

  searchOrgs(){
    this.clicked = !this.clicked;
  }

  ngOnDestroy(){
    if( this.areaSubscription)
      this.areaSubscription.unsubscribe();

    if(this.locationSubscription)
      this.locationSubscription.unsubscribe();
  }

  getAreas(){
    this.areaSubscription = this.occupationAreaService.getOccupationAreas().subscribe(
      (response) => {
           this.areas = response;
      },
      (error) =>{

      },
    ).add(() => {

    });
  }

  getOrgsLocartion(){
    this.locationSubscription = this.organizationService.getOrgsLocartion().subscribe(
      (response) => {
           this.locations = response;
      },
      (error) =>{

      },
    ).add(() => {

    });
  }
}
