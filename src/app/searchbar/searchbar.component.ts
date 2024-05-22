import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  searchTerm: any;
  searchUrl:string='http://127.0.0.1:8000/api/shops'

  constructor(private http:HttpClient,private dataService:DataService){}

handleSearch(){
  this.dataService.searchValue=this.searchTerm
  this.callFunction()
}

handleClearSearch(){
  console.log("Clear Function from searchbar")
  this.searchTerm=null
  this.dataService.searchValue=this.searchTerm
  this.callFunction()
}

callFunction(){
  this.dataService.triggerFunctionCall();
}
  
}
