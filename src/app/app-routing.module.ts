import { UserEditListComponent } from './Components/user/user-edit-list/user-edit-list.component';
import { EventEditListComponent } from './Components/event/event-edit-list/event-edit-list.component';
import { NewEventComponent } from './Components/event/new-event/new-event.component';
import { ForgotPasswordComponent } from './Components/login/forgot-password/forgot-password.component';
import { RewardReadComponent } from './Components/reward/reward-read/reward-read.component';
import { DonationComponent } from './Components/donation/donation.component';
import { OrganizationDetailComponent } from './Components/organization/organization-detail/organization-detail.component';
import { OrganizationComponent } from './Components/organization/organization.component';
import { EventDetailComponent } from './Components/event/event-detail/event-detail.component';
import { EventComponent } from './Components/event/event.component';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { ErrorPageComponent } from './Components/Template/error-page/error-page.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { TransparencyComponent } from './Components/transparency/transparency.component';
import { HowWorksComponent } from './Components/how-works/how-works.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryComponent } from './Components/account-summary/account-summary.component';
import { UserComponent } from './Components/user/user.component';
import { AccountHomeComponent } from './views/account-home/account-home.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthorizationGuard } from './Components/login/authorization.guard';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { SupportersComponent } from './Components/supporters/supporters.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '/', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, },
  { path: 'error', component: ErrorPageComponent, },
  { path: 'event', component: EventComponent, },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'how-works', component: HowWorksComponent, },
  { path: 'transparency', component: TransparencyComponent, },
  { path: 'about-us', component: AboutUsComponent, },
  { path: 'supporters', component: SupportersComponent},
  { path: 'user/new', component: CreateAccountComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'forgot-password', component: ForgotPasswordComponent, },
  { path: 'organization', component: OrganizationComponent, },
  { path: 'organization/:id', component: OrganizationDetailComponent },
  { path: 'donation/:id', component: DonationComponent },
  { 
    path: 'event/:id/play', component: EventDetailComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'account', component: AccountHomeComponent, 
    canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationGuard],
    children: [
      { path: 'user', component: UserComponent, outlet: 'accountRoute' },
      { 
        path: 'user/:id', 
        component: UserComponent, 
        outlet: 'accountRoute',
        data: { roles: ['ROLE_ADM']}
      },
      { 
        path: 'reward',
        component: RewardReadComponent,
        outlet: 'accountRoute',
        data: { roles: ['ROLE_USER', 'ROLE_ADM']}
      },
      { 
        path: 'new-event',
        component: NewEventComponent,
        outlet: 'accountRoute',
        data: { roles: ['ROLE_ADM']}
      },
      { 
        path: 'new-event/:id',
        component: NewEventComponent,
        outlet: 'accountRoute',
        data: { roles: ['ROLE_ADM']}
      },
      { 
        path: 'event-manage',
        component: EventEditListComponent,
        outlet: 'accountRoute',
        data: { roles: ['ROLE_ADM']}
      },
      { 
        path: 'user-manage',
        component: UserEditListComponent,
        outlet: 'accountRoute',
        data: { roles: ['ROLE_ADM']}
      },
      { path: 'summary', component: AccountSummaryComponent, outlet: 'accountRoute' },
      { path: 'transaction', component: TransactionComponent, outlet: 'accountRoute' },
      { path: '', component: AccountSummaryComponent, outlet: 'accountRoute'}
    ]
  },

  { path: '**', redirectTo: 'home', },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
