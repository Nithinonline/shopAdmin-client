import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public postJsonValue: any;
  url: any;
  signUpForm:FormGroup

  constructor(private http: HttpClient, private router: Router,private toaster:ToastrService,private fb:FormBuilder) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });

  }

  // formData = {
  //   username: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  image:File | undefined 



  // submitForm(form: any) {
  //   console.log(this.formData);

  // }

  public handleRegister() {
    if(this.signUpForm.valid){
      const password = this.signUpForm.get('password')?.value;
      const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
    
      if (password === confirmPassword) {
        const form = new FormData();
        form.append('username', this.signUpForm.get('username')?.value);
        form.append('email', this.signUpForm.get('email')?.value);
        form.append('phone', this.signUpForm.get('phone')?.value);
        form.append('password',this.signUpForm.get('password')?.value);
    
        if (this.image) {
          form.append('image', this.image);
        }
    
        console.log(form);
        
        this.http.post('http://127.0.0.1:8000/api/auth/register/', form).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error(error);
            this.toaster.error('Registration failed. Please try again.');
          }
        );
      } else {
        this.toaster.error("Passwords do not match");
      }
    }
  
  }
  

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const result = e.target?.result as string | null;
        if (result) {
          this.url = result;
          console.log(this.url);
        }
      };
  
      reader.readAsDataURL(event.target.files[0]);
    }
    this.image=event.target.files[0]
    console.log(this.image)
  }
  
  // public delete() {
  //   this.url = null;
  // }
  


}
