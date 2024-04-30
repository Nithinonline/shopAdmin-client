import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(credentials:{username:string,password:string}){
    return this.http.post('http://127.0.0.1:8000/accounts/google/login/?process=login',{credentials})
  }
}
