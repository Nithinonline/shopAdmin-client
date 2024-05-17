import { DataService } from './../data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-list-page',
  templateUrl: './shop-list-page.component.html',
  styleUrls: ['./shop-list-page.component.scss']
})
export class ShopListPageComponent {
  addNewShop: boolean = false
  constructor() { }

  handleAddNewShop() {
    this.addNewShop=!this.addNewShop
  }
   
  recieveButtonStatus($event:any){
  this.addNewShop=$event
  console.log($event)
  }
}
