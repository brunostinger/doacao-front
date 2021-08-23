import { AuthService } from './Components/login/auth.service';
import { ToastConfig } from './Components/common/toast-config';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Components/Template/footer/footer.component';
import { NavComponent } from './Components/Template/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountSidebarComponent } from './Components/Template/account-sidebar/account-sidebar.component';
import { AccountSubheaderComponent } from './Components/Template/account-subheader/account-subheader.component';
import { UserComponent } from './Components/user/user.component';
import { AccountHomeComponent } from './views/account-home/account-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './views/home/home.component';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { UserHeaderComponent } from './Components/Template/user-header/user-header.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DonationHomeComponent } from './views/donation-home/donation-home.component';
import { MatButtonModule } from '@angular/material/button';
import { RewardReadComponent } from './Components/reward/reward-read/reward-read.component';
import { AccountSummaryComponent } from './Components/account-summary/account-summary.component';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from 'ngx-card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HowWorksComponent } from './Components/how-works/how-works.component';
import { TransparencyComponent } from './Components/transparency/transparency.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { SupportersComponent } from './Components/supporters/supporters.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IMaskModule } from 'angular-imask';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from './Components/Template/block-template/block-template.component';
import { ErrorPageComponent } from './Components/Template/error-page/error-page.component';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EventListComponent } from './Components/event/event-list/event-list.component';
import { EventComponent } from './Components/event/event.component';
import { EventDetailComponent } from './Components/event/event-detail/event-detail.component';
import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { OrganizationComponent } from './Components/organization/organization.component';
import { OrganizationListComponent } from './Components/organization/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './Components/organization/organization-detail/organization-detail.component';
import { DonationComponent } from './Components/donation/donation.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ImageLoaderComponent } from './Components/common/image-loader/image-loader.component';
import { CookieService } from 'ngx-cookie-service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpInterceptorInterceptor } from './Components/interceptor/http-interceptor.interceptor';
import { BalanceComponent } from './Components/balance/balance.component';
import { A11yModule } from '@angular/cdk/a11y';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { OccupationAreaComponent } from './Components/occupation-area/occupation-area.component';
import { NgxViacepModule } from "@brunoc/ngx-viacep";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ForgotPasswordComponent } from './Components/login/forgot-password/forgot-password.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NewEventComponent } from './Components/event/new-event/new-event.component';
import { EventEditListComponent } from './Components/event/event-edit-list/event-edit-list.component';
import { UserEditListComponent } from './Components/user/user-edit-list/user-edit-list.component';


export function jwtOptionsFactory(authService : AuthService) {
  return {
    tokenGetter: () => {
      return authService.getAuth();
    }
  }
}

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AccountSidebarComponent,
    AccountSubheaderComponent,
    UserComponent,
    AccountHomeComponent,
    HomeComponent,
    UserHeaderComponent,
    DonationHomeComponent,
    RewardReadComponent,
    AccountSummaryComponent,
    HomePageComponent,
    HowWorksComponent,
    TransparencyComponent,
    AboutUsComponent,
    LoginComponent,
    CreateAccountComponent,
    SupportersComponent,
    FooterComponent,
    BlockTemplateComponent,
    ErrorPageComponent,
    TransactionComponent,
    EventListComponent,
    EventComponent,
    EventDetailComponent,
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationDetailComponent,
    DonationComponent,
    ImageLoaderComponent,
    BalanceComponent,
    CalendarComponent,
    OccupationAreaComponent,
    ForgotPasswordComponent,
    NewEventComponent,
    EventEditListComponent,
    UserEditListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    AngularStickyThingsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    CardModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    IMaskModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    InfiniteScrollModule,
    AngularTypewriterEffectModule,
    AnimateOnScrollModule.forRoot(),
    YouTubePlayerModule,
    SnotifyModule, 
    A11yModule,
    NgxViacepModule,
    AutocompleteLibModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    }),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: 'SnotifyToastConfig', useValue: ToastConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor ,multi: true},
    CookieService,
    SnotifyService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
