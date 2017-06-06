import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Passenger, Child } from '../../models/passenger.interface';

import 'rxjs/add/operator/switchMap';

import { PassengerDashboardService } from '../../passenger-dashboard.service';


@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passengers-viewers.component.scss'],
  templateUrl: `
    <div>
      <button (click)="goBack()">&lsaquo; Go Back</button>
      <passenger-form [detail]="passenger"
                      (update)="onUpdatePassenger($event)"></passenger-form>
    </div>
  `
})

export class PassengerViewerComponent implements OnInit{

  constructor(
    private passengerService: PassengerDashboardService,
    private router: Router,
    private route: ActivatedRoute) {}

  passenger: Passenger;

  ngOnInit(){
    this.route
      .params
      .switchMap((data: Passenger) => this.passengerService.getPassenger(data.id))
      .subscribe((data: Passenger)=> this.passenger = data);
  }

  onUpdatePassenger(event: Passenger){
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger)=> this.passenger = Object.assign({}, this.passenger, event));
  }

  goBack() {
    this.router.navigate(['/passengers']);
  }
}


