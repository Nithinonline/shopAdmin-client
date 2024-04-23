import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {  

  constructor(private http:HttpClient,private dataService:DataService){
  }


  cards=[1,2,3,4,5,6,7,8,9]
  viewMore=false
  submitButton=false
  readOnlyMode=true
  addNewShop=false

  formData={
    name:'',
    city:'',
    image:'',
    address:'',
    phone:''
  }

  shopList:any;


  ngOnInit(): void{
     this.dataService.handleFetch().subscribe((data)=>{
      this.shopList=data
      console.log(this.shopList)
     })
    
  }

  manageView=()=>{
    this.viewMore=!this.viewMore
    console.log(this.viewMore)

  }

  public getShops(){
    this.http.get('')
  }

  handleSubmitButton=()=>{
    this.submitButton=!this.submitButton
  }

  handleEditButton=()=>{
    this.readOnlyMode=!this.readOnlyMode
  }

  handleAddShopClose=()=>{
    this.addNewShop=!this.addNewShop
  }

  handleAddShopSubmit=()=>{
    console.log(this.formData)
  }

}
