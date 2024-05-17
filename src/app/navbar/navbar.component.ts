import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private router: Router){}

  activeUser:any;
  baseUrl="http://127.0.0.1:8000/"

  ngOnInit(){

   this.activeUser=localStorage.getItem('user')
   const parsedUser=JSON.parse(this.activeUser)
   this.activeUser=parsedUser
   console.log(this.activeUser)
   console.log("Nav onInit")
  }

  handleLogout(){
    localStorage.clear();
    this.router.navigate(['/login'])   
  }

}
