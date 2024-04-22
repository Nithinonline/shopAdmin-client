import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  public postJsonValue:any; 
  
  constructor(private http:HttpClient, private router:Router){

  }

  formData = {
    username: '',
    email: '',
    phone: '',
    password: '',
  };

  submitForm(form: any) {
    console.log(this.formData);
   
  }

  public postMethod(){
    this.http.post('http://127.0.0.1:8000/api/auth/register/',this.formData).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['/login'])
    })
  }


}
