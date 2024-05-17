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



  fetchedData: any=null;
  singleShop: any;
  isClosed: boolean = false;
  username:any;
  urlpath='http://127.0.0.1:8000/api/shops/'
  imageBaseUrl='http://127.0.0.1:8000/'
  
  first: number = 0;
  rows: number = 5; 
  totalRecords: number = 0; 
  rowsPerPageOptions: number[] = [5]; 
  

  ngOnInit(): void {
    this.handleGetToken();
    if(this.tokenisActive){
      this.dataService.handleFetch().subscribe((data) => {
        this.fetchedData = data;
        this.totalRecords=this.fetchedData.count
        console.log(this.fetchedData);
        // console.log(this.fetchedData.results[0].images[0]);
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
    this.dataService.singleShop=shop
    console.log(this.dataService.singleShop)
    this.router.navigate(['more-details'])
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

  
  handlePagination(pageNumber: any){
  
      this.dataService.getUrl=`${this.urlpath}?page=${pageNumber+1}`
      console.log(this.dataService.getUrl)
      this.ngOnInit() 
    
  }

   
  // handlePaginationPrevious(){
  //   if(this.fetchedData.previous){
  //     this.dataService.getUrl=this.fetchedData.previous
  //     console.log(this.dataService.getUrl)
  //     this.ngOnInit()
  //   }
  //   else{
  //     console.log("There is no previous page")
  //   }
    
  // }

  handleNavigate(){
    this.router.navigate(['/more-details'])
  }

  
  onPageChange($event: any){
    console.log($event)
    this.handlePagination($event.page) 
  }


}
