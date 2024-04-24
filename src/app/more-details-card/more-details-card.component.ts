import { Component, Input,OnInit,EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-more-details-card',
  templateUrl: './more-details-card.component.html',
  styleUrls: ['./more-details-card.component.scss']
})
export class MoreDetailsCardComponent {
  @Input() data:any
  @Input() isClosed:any;
  @Output() handleIsClosed=new EventEmitter<boolean>()

  constructor(private dataService:DataService){

  }
  readOnlyMode=true
  submitButton=false
  



  manageIsClosed=()=>{
  this.isClosed=!this.isClosed
  this.handleIsClosed.emit(this.isClosed)
  }

  handleEditButton=()=>{
    this.readOnlyMode=!this.readOnlyMode
  }
  handleUpdateButton=()=>{
    this.submitButton=!this.submitButton
  }

}


