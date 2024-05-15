import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  shopDetails:any;
  singleShop:any;
  getUrl:String="http://127.0.0.1:8000/api/shops/"

  ngOnInit(): void{
    this.shopDetails=this.handleFetch()
    console.log(this.shopDetails)
      }

  handleFetch=()=>{
    const token=localStorage.getItem('token')
    const headers=new HttpHeaders().set('Authorization',`token ${token}`)
    return this.http.get(`${this.getUrl}`,{headers})
  }

  
 

}
