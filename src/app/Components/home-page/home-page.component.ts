import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  list = ['Ampliar sua consciência.', 'Gerar impacto social.', 'Doar e receber pontos.', 'Trocar pontos por eventos.']
  constructor() { }

  ngOnInit(): void {
  }

}
