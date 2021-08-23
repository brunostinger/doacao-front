import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account = {
    name: '',
    email: '',
    password: '',
    passwordCheck:'',
    tel: '',
    address: '',
    addressNumber: '',
    addressComplement:'',
    district:'',
    city:'',
    state:'',
    zipCode:''
  }

  constructor() { }

  ngOnInit(): void {
  } 
  
  onSubmit(){

  }

}
