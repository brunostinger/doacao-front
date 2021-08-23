import { AccountSidebarService } from './account-sidebar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.css']
})
export class AccountSidebarComponent implements OnInit {
  loading !: Boolean;
  userType: string = '';

  constructor(
    public accountSidebarService : AccountSidebarService,
    private authService: AuthService,
    ) { 
    this.accountSidebarService.loadingChange.subscribe(value => {
      this.loading = value;
    });
  }

  ngOnInit(): void {
    this.authService.userType.subscribe(value => this.userType = value);
  }

  logout(){
    this.authService.Logout();
  }

}
