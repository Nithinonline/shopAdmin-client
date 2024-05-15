import { Component } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  first: number = 0;
  rows: number = 5; 
  totalRecords: number = 120; 
  rowsPerPageOptions: number[] = [10, 20, 30]; 
  

  constructor(){}



  onPageChange($event: any){
    console.log($event)
  }

}
