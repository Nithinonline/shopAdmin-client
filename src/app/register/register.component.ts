import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public postJsonValue: any;
  url: any;

  constructor(private http: HttpClient, private router: Router,private toaster:ToastrService) {

  }

  formData = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  image:File | undefined 



  submitForm(form: any) {
    console.log(this.formData);

  }

  public handleRegister() {
    if (this.formData.password == this.formData.confirmPassword) {
      const form=new FormData()
      form.append('username',this.formData.username)
      form.append('email',this.formData.email);
      form.append('phone',this.formData.phone);
      form.append('password',this.formData.password);
      if(this.image){
        form.append('image',this.image)
      }
      console.log(form)
      this.http.post('http://127.0.0.1:8000/api/auth/register/', form).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/login'])
      })
    }
    else{
       this.toaster.error("Passwords does not match")
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
  
  }
  
  public delete() {
    this.url = null;
  }
  


}
