import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form !: FormGroup;
  loginSubscription !: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private  formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn())
      this.router.navigate(['account']);

    this.form = this.formBuilder.group({
      email: [ null, [Validators.required, Validators.email] ], 
      password:[null, [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit(){
    this.authService.login(this.form.getRawValue())
  }

}
