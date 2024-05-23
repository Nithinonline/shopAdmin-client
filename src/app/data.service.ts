import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  private valueSource=new BehaviorSubject<string>('')
  currentSearchValue=this.valueSource.asObservable();

  private callSource=new Subject<void>();
  callFunction=this.callSource.asObservable();
  

  shopDetails:any;
  singleShop:any;
  getUrl:String="http://127.0.0.1:8000/api/shops/"
  searchValue:any=''
  searchFlag:boolean=false;
  // searchBaseUrl:any=`http://127.0.0.1:8000/api/shops?name=${this.searchValue}`
  pageNumber:any=1
  url:any='http://127.0.0.1:8000/api/shops/'


  // changeSearchTerm(newSearchTerm:string){
  //   this.valueSource.next(newSearchTerm)
  // }

  triggerFunctionCall(){
    console.log("trigger function from data Service")
    this.callSource.next()
  }

  handleFetch=()=>{
    const token=localStorage.getItem('token')
    const headers=new HttpHeaders().set('Authorization',`token ${token}`)
    if(this.searchFlag){
      this.url=`${this.getUrl}?name=${this.searchValue}&page=${this.pageNumber}`
    }
    if(!this.searchFlag){
      this.url=`${this.getUrl}?page=${this.pageNumber}`
    }

    return this.http.get(`${this.url}`,{headers})
  }

  
 

}
