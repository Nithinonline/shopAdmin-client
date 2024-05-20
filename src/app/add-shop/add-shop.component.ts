import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit {

  buttonStatus = false;
  @Output() buttonStatusMessage=new EventEmitter<boolean>;

  formData = {
    name: '',
    city: '',
    address: '',
    phone: ''
  };
  uploaded_images: File[] =[]; 

  fetchedData: any;
  singleShop: any;
  isClosed: boolean = false;
  username: string | null = null;
  urlpath = 'http://127.0.0.1:8000/api/shops/';
  tokenisActive: string | null = null;

  constructor(private http: HttpClient, private dataService: DataService, private router: Router, private toaster:ToastrService) {}

  ngOnInit(): void {
    this.handleGetToken();
    if (this.tokenisActive) {
      this.dataService.handleFetch().subscribe(
        (data) => {
          this.fetchedData = data;
          console.log(this.fetchedData);
          console.log(this.isClosed);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  // handleAddShopClose(): void {
  //   this.addNewShop = !this.addNewShop;
  // }

  handleAddShopSubmit(): void {
    console.log(this.formData);
    this.username = localStorage.getItem('user');

    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `token ${token}`);
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('city', this.formData.city);
      formData.append('address', this.formData.address);
      formData.append('phone', this.formData.phone);
      formData.append('user', this.username!);
      if(this.uploaded_images){
        this.uploaded_images.forEach((image: File) => {
          formData.append('uploaded_images', image);
        });
      }
     
      this.http.post(this.urlpath, formData, { headers }).subscribe(
        (data) => {
          console.log(data);
          this.toaster.success("")
          window.location.reload();
        },
        (error) => {
          this.toaster.error("Invalid Data")
          console.error('Error creating shop:', error);
        }
      );
    } else {
      console.error('Token not found in localStorage');
    }
  }

  handleViewMoreComponent(shop: any): void {
    this.singleShop = shop;
  }

  handleViewMoreButton(): void {
    this.isClosed = !this.isClosed;
    console.log(this.isClosed);
  }

  handleImageInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.uploaded_images = []; 
      for (let i = 0; i < target.files.length; i++) {
        this.uploaded_images.push(target.files[i]);
    }
  }
  console.log(this.uploaded_images)
}

  handleIsClosedInAdd(): void {
    this.isClosed = false;
    console.log(this.isClosed);
  }

  handleGetToken(): void {
    this.tokenisActive = localStorage.getItem('token');
    this.username = localStorage.getItem('user') || null;
  }

  handleLogout(): void {
    localStorage.clear();
    window.location.reload();
  }

  handlePaginationNext(): void {
    if (this.fetchedData.next) {
      this.dataService.getUrl = this.fetchedData.next;
      console.log(this.dataService.getUrl);
      this.ngOnInit();
    } else {
      console.log('There is no next page');
    }
  }

  handlePaginationPrevious(): void {
    if (this.fetchedData.previous) {
      this.dataService.getUrl = this.fetchedData.previous;
      console.log(this.dataService.getUrl);
      this.ngOnInit();
    } else {
      console.log('There is no previous page');
    }
  }

  sendButtonEvent(){
    console.log(this.buttonStatus)
    this.buttonStatusMessage.emit(this.buttonStatus)
  }



}
