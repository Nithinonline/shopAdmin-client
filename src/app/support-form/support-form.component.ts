import { Component, OnInit } from '@angular/core';

import { FormBuilder,  FormGroup} from '@angular/forms';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {

  form:any= FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  send(): void {
    const { name, email, message } = this.form?.value
    console.log(name, email, message)
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      message: ['']
    })
  }
}
