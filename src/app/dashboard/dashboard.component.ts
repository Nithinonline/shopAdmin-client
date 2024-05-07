import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  
})
export class DashboardComponent {
  tokenisActive: any;

  constructor(private http: HttpClient, private dataService: DataService,private router:Router) {}

  addNewShop = false;
  formData = {
    name: '',
    city: '',
    address: '',
    phone: ''
  };
  image: File | null = null; 

  fetchedData: any;
  singleShop: any;
  isClosed: boolean = false;
  username:any;
  urlpath='http://127.0.0.1:8000/api/shops/'

  ngOnInit(): void {
    this.handleGetToken();
    if(this.tokenisActive){
      this.dataService.handleFetch().subscribe((data) => {
        this.fetchedData = data;
        console.log(this.fetchedData);
        console.log(this.isClosed);
      });
    }
    else{
      this.router.navigate(["/login"])
    }
   
  }

  handleAddShopClose = () => {
    this.addNewShop = !this.addNewShop;
  }

  handleAddShopSubmit = () => {
    console.log(this.formData);
    this.username=localStorage.getItem('user')
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `token ${token}`);
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('city', this.formData.city);
      formData.append('address', this.formData.address);
      formData.append('phone', this.formData.phone);
      formData.append('user',this.username)
      if (this.image) {
        formData.append('image', this.image); 
      }

      this.http.post(this.urlpath, formData, { headers }).subscribe(
        (data) => {
          console.log(data);
          window.location.reload();
        },
        (error) => {
          console.error('Error creating shop:', error);
        }
      );
    } else {
      console.error('Token not found in localStorage');
    }
  }

  handleViewMoreComponent = (shop: any) => {
    this.singleShop = shop;
  }

  handleViewMoreButton = (isClosed: any) => {
    this.isClosed = !this.isClosed;
    console.log(this.isClosed);
  }

  handleImageInput(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.image = files[0];
    }
  }
  handleIsClosedInAdd(){
    this.isClosed=false
    console.log(this.isClosed)
  }
  handleGetToken=()=>{
     this.tokenisActive=localStorage.getItem('token')
     this.username=localStorage.getItem('user') || null
     return this.tokenisActive
  } 
  handleLogout(){
    localStorage.clear();
    window.location.reload()
  }
  
  handlePaginationNext(){
    if(this.fetchedData.next){
      this.dataService.getUrl=this.fetchedData.next
      console.log(this.dataService.getUrl)
      this.ngOnInit()
    }
    else{
      console.log("There is no next page")
    }
    
  }

   
  handlePaginationPrevious(){
    if(this.fetchedData.previous){
      this.dataService.getUrl=this.fetchedData.previous
      console.log(this.dataService.getUrl)
      this.ngOnInit()
    }
    else{
      console.log("There is no previous page")
    }
    
  }
}
