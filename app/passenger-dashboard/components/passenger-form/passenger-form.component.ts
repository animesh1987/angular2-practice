import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  templateUrl: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      <div>Passenger Name:
        <input type="text"
          #fullname="ngModel"
          required
          name="fullname" [ngModel]="detail?.fullname">
          <!--{{ fullname.errors | json }}-->
          <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
            Passenger Name is required
          </div>
      </div>
      <div>Passenger ID:
        <input type="number"
          #id="ngModel"
          required
          name="id"
          [ngModel]="detail?.id">
          <div *ngIf="id.errors?.required && id.dirty" class="error">
            Passenger ID is required
          </div>
      </div>

<!--      <div>
        <label>
          <input type="radio" name="checkedIn"
                 [value]="true"
                 (ngModelChange)="toggleCheckIn($event)"
                 [ngModel]="detail?.checkedIn">
           Yes
        </label>
        <label>
           <input type="radio" name="checkedIn"
                   [value]="false"
                   (ngModelChange)="toggleCheckIn($event)"
                   [ngModel]="detail?.checkedIn">
           No
        </label>
      </div>-->

            <div>
        <label>
          <input type="checkbox" name="checkedIn"
                 [value]="true"
                 (ngModelChange)="toggleCheckIn($event)"
                 [ngModel]="detail?.checkedIn">
           Yes
        </label>
      </div>

      <div *ngIf="form.value.checkedIn">
        Check In Date:
        <input type="number" name="checkInDate" [ngModel]="detail?.checkInDate">
      </div>

      <div>
        Luggage:
        <select name="baggage"

            [ngModel]="detail?.baggage">
          <option *ngFor="let item of baggage"
            [selected]="item.key === detail?.baggage "
            [value]="item.key">
            {{item.value}}
          </option>
        </select>
      </div>

      <button type="submit"
        [disabled]="form.invalid">
        Update Passenger
      </button>
    </form>
  `
})

export class PassengerFormComponent{

  baggage: Baggage[] = [
    {key: 'none', value: 'No Baggage'},
    {key: 'hand', value: 'Hand Baggage'},
    {key: 'hold', value: 'Hold Baggage'},
    {key: 'hand-hold', value: 'Hand and Hold Baggage'}
  ];

  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  toggleCheckIn(checkedIn: boolean){
    if(checkedIn){
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean){
    /*console.log(passenger);*/
    if(isValid){
      this.update.emit(passenger);
    }

  }
}


