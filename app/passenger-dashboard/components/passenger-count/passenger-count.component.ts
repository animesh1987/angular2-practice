import { Component, OnInit, Input } from '@angular/core';
import { Passenger, Child } from '../../models/passenger.interface';


@Component({
  selector: 'passenger-count',
  styleUrls: ['passenger-count.component.scss'],
  templateUrl: `
    <h3>Airline Passengers</h3>
    <div>
      Total Checked In: {{ checkedInCount() }} / {{ items?.length }}
    </div>
  `
})

export class PassengerCountCompoent {
  @Input()
  items: Passenger[];

  constructor () {}

  checkedInCount() : number {
    if(!this.items) return;
    return this.items.filter((passenger: Passenger) => {
      return passenger.checkedIn ;
    }).length;
  }
}
