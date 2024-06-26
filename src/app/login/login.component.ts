import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoggedIn: any=false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private socialAuthService: SocialAuthService, private toastr: ToastrService) {

  }

  formData = {
    username: '',
    password: ''
  }
  user: any; 
  loggedIn: any;
  token: any;

  submitForm(form: any) {
    console.log(this.formData);
  }


  public loginMethod() {
    this.http.post('http://127.0.0.1:8000/api/auth/login/', this.formData).subscribe((data: any) => {
      const token = data.token
      const user=data.user
      console.log(user)
      localStorage.setItem('user',user.username)
      localStorage.setItem('token', token)
      this.router.navigate(['/home'])
      this.toastr.success('Login Successful');

    })
  }

  ssoLoginMethod(email: any) {
    this.http.post('http://127.0.0.1:8000/api/auth/login/sso/', { email: email }).subscribe((data: any) => {
      const user=data.user
      console.log(user)
      localStorage.setItem('user',user.username)
      this.token=data.token
      localStorage.setItem('token',this.token)
      this.isLoggedIn=true
      this.router.navigate(['/home'])
      this.toastr.success('Login Successful');
    })
  }


  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
      const email = user.email
      if(!this.isLoggedIn){
        this.ssoLoginMethod(email)
      }
    },
      (err) => {
        console.log(err)
      });
  }

}
