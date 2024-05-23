// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
// import { ToastrService } from 'ngx-toastr';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   isLoggedIn: any = false;
//   loginForm:FormGroup;

//   constructor(private http: HttpClient, private router: Router,
//     private authService: AuthService, private socialAuthService: SocialAuthService,
//     private toastr: ToastrService,
//     private form:FormBuilder
//   ) {

//   }

//   // formData = {
//   //   username: '',
//   //   password: ''
//   // }
//   user: any;
//   loggedIn: any;
//   token: any;


//   ngOnInit() {

// this.loginForm=this.form.group({
//   name: ['', Validators.required],
//   password: ['', [Validators.required, Validators.email]]
// })

// console.log(this.loginForm)

//     this.socialAuthService.authState.subscribe((user) => {
//       this.user = user;
//       this.loggedIn = (user != null);
//       console.log(user)
//       const email = user.email
//       if (!this.isLoggedIn) {
//         this.ssoLoginMethod(email)
//       }
//     },
//       (err) => {
//         console.log(err)
//       });
//   }

//   // submitForm(form: any) {
//   //   console.log(this.formData);
//   // }


//   public loginMethod() {
//     this.http.post('http://127.0.0.1:8000/api/auth/login/', this.loginForm).subscribe((data: any) => {
//       const token = data.token
//       const user = JSON.stringify(data.user)
//       console.log(user)
//       localStorage.setItem('user', user)
//       localStorage.setItem('token', token)
//       this.router.navigate(['/home'])
//       this.toastr.success('Login Successful');

//     }, (err) => {
//       this.toastr.error('Invalid credentials')
//     })
//   }

//   ssoLoginMethod(email: any) {
//     this.http.post('http://127.0.0.1:8000/api/auth/login/sso/', { email: email }).subscribe((data: any) => {
//       const parsedUser = JSON.stringify(data.user)
//       console.log(parsedUser)

//       localStorage.setItem('user', parsedUser)
//       this.token = data.token
//       localStorage.setItem('token', this.token)
//       this.isLoggedIn = true
//       this.router.navigate(['/home'])
//       this.toastr.success('Login Successful');
//     })
//   }



// }






import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn: any = false;
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService, private socialAuthService: SocialAuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  user: any;
  loggedIn: any;
  token: any;

  ngOnInit() {


    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      const email = user.email;
      if (!this.isLoggedIn) {
        this.ssoLoginMethod(email);
      }
    }, (err) => {
      console.log(err);
    });
  }

  public loginMethod() {
    
    if (this.loginForm.get('username')?.value && this.loginForm.get('password')?.value) {
      this.http.post('http://127.0.0.1:8000/api/auth/login/', this.loginForm.value).subscribe((data: any) => {
        const token = data.token;
        const user = JSON.stringify(data.user);
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
        this.toastr.success('Login Successful');
      }, (err) => {
        this.toastr.error('Invalid credentials');
      });
    }

  }

  ssoLoginMethod(email: any) {
    this.http.post('http://127.0.0.1:8000/api/auth/login/sso/', { email: email }).subscribe((data: any) => {
      const parsedUser = JSON.stringify(data.user);
      localStorage.setItem('user', parsedUser);
      this.token = data.token;
      localStorage.setItem('token', this.token);
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.toastr.success('Login Successful');
    });
  }
}
