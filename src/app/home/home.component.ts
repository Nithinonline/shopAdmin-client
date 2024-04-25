import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private http: HttpClient, private dataService: DataService) {}

  addNewShop = false;
  formData = {
    name: '',
    city: '',
    address: '',
    phone: ''
  };
  image: File | null = null; 

  shopList: any;
  singleShop: any;
  isClosed: boolean = false;

  ngOnInit(): void {
    this.dataService.handleFetch().subscribe((data) => {
      this.shopList = data;
      console.log(this.shopList);
      console.log(this.isClosed);
    });
  }

  handleAddShopClose = () => {
    this.addNewShop = !this.addNewShop;
  }

  handleAddShopSubmit = () => {
    console.log(this.formData);

    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `token ${token}`);
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('city', this.formData.city);
      formData.append('address', this.formData.address);
      formData.append('phone', this.formData.phone);
      if (this.image) {
        formData.append('image', this.image); 
      }

      this.http.post('http://127.0.0.1:8000/api/create/', formData, { headers }).subscribe(
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
}
