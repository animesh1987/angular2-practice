import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Passenger, Child } from '../../models/passenger.interface';


@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  templateUrl: `
     <div>
        <span class="status" [class.checked-in]="detail.checkedIn"></span>
        <div *ngIf="editing">
          <input
            [value]="detail.fullname"
            (input)="onNameChange(name.value)"
            #name
            type="text">
        </div>
        <div *ngIf="!editing">
          {{detail.fullname}}
        </div>
        <div class="date">
          Check in date :
          {{detail.checkInDate ? (detail.checkInDate | date:'yMMMMd') : 'Not Checked In'}}
        </div>
        <button (click)="toggleEdit()">
          {{editing ? 'Done' : 'Edit'}}
        </button>
        <button (click)="onRemove()">
          Remove
        </button>
        <button (click)="goToPassenger()">
          View
        </button>
     </div>
  `
})

export class PassengerDetailCompoent implements OnChanges{
  @Input()
  detail: Passenger[];

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  editing: boolean = false;

  constructor () {}

  ngOnChanges(changes: any){
    if(changes.detail){
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  onNameChange(value : string){
    this.detail.fullname = value;
  }

  toggleEdit(){
    if(this.editing){
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  onRemove(){
    this.remove.emit(this.detail);
  }

  goToPassenger(){
    this.view.emit(this.detail);
  }
}
