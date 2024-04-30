import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http:HttpClient,private router:Router, private authService:AuthService,private socialAuthService:SocialAuthService){

  }

  formData={
    username:'',
    password:''
  }
  user:any;
  loggedIn:any;
  token:any;

  submitForm(form:any){
    console.log(this.formData);
  }


  public loginMethod(){
    this.http.post('http://127.0.0.1:8000/api/auth/login/',this.formData).subscribe((data:any)=>{
      console.log(data)
      const token=data.token
      localStorage.setItem('token',token)
      this.router.navigate(['/home'])
    })
  }

  public ssoLoginMethod(email: any){
    this.http.post('http://127.0.0.1:8000/api/auth/login/sso/',{email:email}).subscribe((data:any)=>{
      console.log(data.token)
    })
  }


  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
      const email=user.email
      this.ssoLoginMethod(email)
      localStorage.setItem('token',this.token) 
      this.router.navigate(['/home'])    
    },
  (err)=>{
    console.log(err)
  });
  }

}
