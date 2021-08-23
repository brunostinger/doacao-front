import { UserService } from './../user.service';
import { NotifyService } from './../../common/notify/notify.service';
import { AccountSubheaderService } from './../../Template/account-subheader/account-subheader.service';
import { Router } from '@angular/router';
import { HomeService } from './../../../views/home/home.service';
import { EventListService } from './../../event/event-list/event-list.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit-list',
  templateUrl: './user-edit-list.component.html',
  styleUrls: ['./user-edit-list.component.css']
})
export class UserEditListComponent implements OnInit {
  limit : number = 16;
  userSubscription !: Subscription;
  users : any[] = [];
  page : number = 0;
  form !: FormGroup;

  constructor(
    private userService: UserService,
    private homeService : HomeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private subheaderService: AccountSubheaderService,
    private notifyService : NotifyService,
  ) { }

  ngOnInit(): void {
    this.subheaderService.setTitle('Gerenciar usuários');
    this.form = this.formBuilder.group({
      name: [""],
      type:[null],
      status:[null]
    });
  }

  ngOnDestroy(){
    if(this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  onScroll() {
    this.getUsersToManage()
  }

  getUsers(){
    this.users = [];
    this.page=0;
    this.limit=16;
    this.getUsersToManage();
  }

  getUsersToManage(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.userSubscription = this.userService.getUsersToManage(this.page , this.limit, this.form.getRawValue()).subscribe(
      (response) => {
        if(!this.users || this.users.length==0)
           this.users = response;
        else{
          for(var i = 0; i < response.length ; i++){
            this.users.push(response[i]);
          }
        }

        if(response.length==0 && this.users.length==0)
          this.notifyService.notifyError("Nenhum usuário encontrado");

        this.page ++;
      },
      (error) =>{
        
      },
    ).add(() => {
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }

  userDetails(id: number){
    this.router.navigateByUrl('/account/(accountRoute:user/'+id+')');
  }

}
