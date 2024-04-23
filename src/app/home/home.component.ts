import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {  

  constructor(){
  }


  cards=[1,2,3,4,5,6,7,8,9]
  viewMore=false
  submitButton=false
  readOnlyMode=true

  manageView=()=>{
    this.viewMore=!this.viewMore
    console.log(this.viewMore)

  }

  handleSubmitButton=()=>{
    this.submitButton=!this.submitButton
  }

  handleEditButton=()=>{
    this.readOnlyMode=!this.readOnlyMode
  }

}
