import { Component, OnInit } from '@angular/core';
import { AccountSubheaderService } from './account-subheader.service';

@Component({
  selector: 'app-account-subheader',
  templateUrl: './account-subheader.component.html',
  styleUrls: ['./account-subheader.component.css']
})
export class AccountSubheaderComponent implements OnInit {
  subHeaderTitle = '';
  constructor(private accountSubheaderService: AccountSubheaderService){
  }

  ngOnInit() {
    this.accountSubheaderService.subHeaderTitle.subscribe(title => {
      this.subHeaderTitle = title;
    });

  }
}
