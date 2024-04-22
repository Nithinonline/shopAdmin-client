import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http:HttpClient,private router:Router){

  }

  formData={
    username:'',
    password:''
  }

  submitForm(form:any){
    console.log(this.formData);
  }


  public loginMethod(){
    this.http.post('http://127.0.0.1:8000/api/auth/login/',this.formData).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['/home'])
    })
  }

}
