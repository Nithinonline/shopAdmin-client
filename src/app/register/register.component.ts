import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    checkbox: false
  };

  submitForm(form: any) {
    console.log(this.formData);
   
  }
}
