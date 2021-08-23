import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading !: Boolean;

  accountPageActive : boolean = false;

  constructor(
    public homeService : HomeService,
    public router: Router
    ) { 
    this.homeService.loadingChange.subscribe(value => {
      this.loading = value;
    });
  }

  ngOnInit(): void {
  }

}
