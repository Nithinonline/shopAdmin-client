import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup} from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {

  form: FormGroup | any;
  selectedShop:any;
  mailUrl:string="http://127.0.0.1:8000/api/mail"

  constructor(private formBuilder: FormBuilder,private dataService:DataService,private http:HttpClient,private toaster:ToastrService) { }
  allShops:any;

  ngOnInit(): void {
    this.buildForm()
    //  this.dataService.handleFetch().subscribe((data)=>{
    //  console.log(data)

    // })
   
    
  }

  send(): void {
    const { name, email, message } = this.form?.value
    console.log(name, email, message)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `token ${token}`);
    this.http.post(this.mailUrl,{
      name,
      email,
      message
    },
  {headers}).subscribe((data)=>{
    console.log(data)
    this.toaster.success("Email Send Successfully")
    window.location.reload()
  })
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    })
  }

}
