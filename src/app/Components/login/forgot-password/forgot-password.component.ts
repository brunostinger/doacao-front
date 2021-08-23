import { AuthService } from './../auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form !: FormGroup;

  constructor(
    private authService: AuthService,
    private  formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [ null, [Validators.required, Validators.email] ], 
    });
  }

  onSubmit(){
    this.authService.recoverPassword(this.form.getRawValue())
  }

}
