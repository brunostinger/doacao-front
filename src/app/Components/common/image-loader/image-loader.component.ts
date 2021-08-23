import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {
  @Input() src : any;
  @Input() type : any;
  imgSrc !: string;
  smImgSrc="../../../../assets/img/smbgload.svg";
  lgImgSrc="../../../../assets/img/bgload.svg";
  loaded = false;

  constructor() { }

  ngOnInit(): void {
    if(this.type=="lg")
      this.imgSrc=this.lgImgSrc;
    else
      this.imgSrc=this.smImgSrc;
  }

}
