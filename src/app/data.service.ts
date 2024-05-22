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
  searchValue:string=''


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
    if(this.searchValue){
      console.log(this.searchValue.length)
      this.getUrl=`http://127.0.0.1:8000/api/shops?search=${this.searchValue}`
    }else{
      this.getUrl=`http://127.0.0.1:8000/api/shops/`
    }
    return this.http.get(`${this.getUrl}`,{headers})
  }

  
 

}
