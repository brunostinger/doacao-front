import { Component, OnInit } from '@angular/core';
import { AccountSubheaderService } from 'src/app/Components/Template/account-subheader/account-subheader.service';

@Component({
  selector: 'app-donation-home',
  templateUrl: './donation-home.component.html',
  styleUrls: ['./donation-home.component.css']
})
export class DonationHomeComponent implements OnInit {

  constructor(private subheaderService: AccountSubheaderService) { }

  ngOnInit() {
    this.subheaderService.setTitle('Doações');
  }
}
