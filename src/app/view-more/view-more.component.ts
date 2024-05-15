import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent {


  ngOnInit(){
    console.log(this.shopImages)
  }

  singleShopDetail=this.dataService.singleShop;
  readOnlyMode:boolean=true
  baseUrl='http://127.0.0.1:8000/api/delete/'
  imageBaseUrl='http://127.0.0.1:8000/'
  shopImages=this.dataService.singleShop.images
   
 

  formData = {
    name: '',
    id: '',
    city: '',
    address: '',
    phone: '',
  };
  image: File | null = null;
  user:any=''
  updateBaseUrl='http://127.0.0.1:8000/api/shops/'


  constructor(private dataService:DataService,private http:HttpClient,private router:Router,private toastr:ToastrService){}

  
  handleDelete=()=>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `token ${token}`);
    this.http.delete(`${this.baseUrl}${this.singleShopDetail.id}`,{headers}).subscribe((data)=>{
      console.log(data)
      console.log(`Shop with id:${this.singleShopDetail.id} deleted successfully`)
      this.toastr.success("Deleted successfully")
      this.router.navigate(['/home'])
    })
    }

    handleUpdateButton(){
      this.readOnlyMode=false
      console.log(this.readOnlyMode)
      console.log("Clicked")
    }

    handleUpdateShop = (newName: any, newId: any, newAddress: any, newCity: any, newPhone: any) => {
      this.formData.name = newName.value
      this.formData.id = newId.value
      this.formData.city = newCity.value
      this.formData.address = newAddress.value
      this.formData.phone = newPhone.value
      this.handleUpdateRequest()
    }

    handleUpdateRequest = () => {

      const token = localStorage.getItem('token');
      this.user=localStorage.getItem('user')
  
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `token ${token}`);
        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('city', this.formData.city);
        formData.append('address', this.formData.address);
        formData.append('phone', this.formData.phone);
        formData.append('id',this.formData.id);
        formData.append('user',this.user)
        if (this.image) {
          formData.append('image', this.image); 
        }
        console.log(formData)
  
        this.http.patch(`${this.updateBaseUrl}${this.formData.id}/`, formData, { headers }).subscribe(
          (data:any) => {
            console.log(data);
            this.router.navigate(['/home'])
          },
          (error:any) => {
            console.error('Error creating shop:', error);
          }
        );
      } else {
        console.error('Token not found in localStorage');
      }
    }
}
