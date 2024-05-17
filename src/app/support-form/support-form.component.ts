import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup} from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {

  form: FormGroup | any;
  selectedShop:any;

  constructor(private formBuilder: FormBuilder,private dataService:DataService) { }
  allShops:any;

  ngOnInit(): void {
    this.buildForm()
    //  this.dataService.handleFetch().subscribe((data)=>{
    //  console.log(data)

    // })
   
    
  }

  send(): void {
    const { name, email, message } = this.form?.value
    console.log(this.form?.value)
    console.log(name, email, message)
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    })
  }
}
