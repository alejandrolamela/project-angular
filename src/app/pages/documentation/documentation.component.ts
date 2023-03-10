import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit{

  apiInfo! : any;
  html! :any;
  showHtml: boolean = true;
  css!: any;
  showCss: boolean = false;
  js!: any;
  showJs: boolean = false;
  showDelete: boolean = false;
  endPoint!: string;
  baseUrl: string = `http://localhost:3000/`;
  

  constructor(private api:ApiService, private _sanitizer: DomSanitizer, private router: Router){ }

  ngOnInit(): void {

      this.api.getInfo(this.baseUrl+"html").subscribe((data:any) => {
        this.html = data;
        console.log(this.html);
      })

      this.api.getInfo(this.baseUrl+"css").subscribe((data:any) => {
        this.css = data;
        console.log(this.css);
      })

      this.api.getInfo(this.baseUrl+"js").subscribe((data:any) => {
        this.js = data;
        console.log(this.js);
      })
  }

  getVideoIframe(url:string) {
    var video, results;
 
    if (url === null) {
        return '';
    } else if (url.includes("youtube")) {
      results = url.match('[\\?&]v=([^&#]*)');
      video   = (results === null) ? url : results[1];
  
      return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);  

    } else {
      return url
    }
  }

  deleteArticle(id:number){
    console.log(id)
    this.setEndPoint();
    this.api.deleteFormulary(id, this.endPoint).subscribe((data) => {
      this.ngOnInit();
      this.router.navigate(["/documentation"])
    })
  }

  switchHtml(){
    this.showHtml = !this.showHtml
    this.showCss = false
    this.showJs = false
  }

  switchCss(){
    this.showHtml = false
    this.showCss = !this.showCss
    this.showJs = false 
  }

  switchJs(){
    this.showHtml = false
    this.showCss = false
    this.showJs = !this.showJs
  }
  switchDelete(){
    this.showDelete = !this.showDelete
  }

  setEndPoint(){
    if (this.showHtml) this.endPoint = "html"
    if (this.showCss) this.endPoint = "css"
    if (this.showJs) this.endPoint = "js"
  }
}