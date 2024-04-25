import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-more-details-card',
  templateUrl: './more-details-card.component.html',
  styleUrls: ['./more-details-card.component.scss']
})
export class MoreDetailsCardComponent {
  @Input() data: any
  @Input() isClosed: any;
  @Output() handleIsClosed = new EventEmitter<boolean>()

  constructor(private dataService: DataService,private http:HttpClient) {

  }
  readOnlyMode = true
  submitButton = false

  formData = {
    name: '',
    id: '',
    city: '',
    address: '',
    phone: ''
  };
  image: File | null = null;




  manageIsClosed = () => {
    this.isClosed = !this.isClosed
    this.handleIsClosed.emit(this.isClosed)
  }

  handleEditButton = () => {
    this.readOnlyMode = !this.readOnlyMode
  }
  handleUpdateButton = () => {
    this.submitButton = !this.submitButton
  }

  handleUpdateShop = (newName: any, newId: any, newAddress: any, newCity: any, newPhone: any) => {
    this.formData.name = newName.value
    this.formData.id = newId.value
    this.formData.city = newCity.value
    this.formData.address = newAddress.value
    this.formData.phone = newPhone.value
    console.log(this.formData)
  }

  handleUpdateRequest = () => {

    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `token ${token}`);
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('city', this.formData.city);
      formData.append('address', this.formData.address);
      formData.append('phone', this.formData.phone);
      formData.append('id',this.formData.id)
      if (this.image) {
        formData.append('image', this.image); 
      }

      this.http.patch(`http://127.0.0.1:8000/api/update/${this.formData.id}/`, formData, { headers }).subscribe(
        (data:any) => {
          console.log(data);
          window.location.reload();
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


