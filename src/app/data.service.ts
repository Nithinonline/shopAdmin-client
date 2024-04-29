import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  shopDetails:any;
  getUrl:String="http://127.0.0.1:8000/api/all/"

  ngOnInit(): void{
    this.handleFetch()
  }
  handleFetch=()=>{
    const token=localStorage.getItem('token')
    console.log(token)
    const headers=new HttpHeaders().set('Authorization',`token ${token}`)
    return this.http.get(`${this.getUrl}`,{headers})
  }

 

}
