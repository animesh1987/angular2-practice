import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger, Child } from '../../models/passenger.interface';


import { PassengerDashboardService } from '../../passenger-dashboard.service';
@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashbaord.component.scss'],
  templateUrl: `
    <div >
      <passenger-count
        [items]="passengers"
        ></passenger-count>

      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (view)="handleView($event)"
        (remove)="handleRemove($event)"
        (edit)="handleEdit($event)"
      ></passenger-detail>
    </div>
  `
})

export class PassengerDashboardComponent implements OnInit{

  passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService,
              private router: Router) {}

  ngOnInit(){
   this.passengerService
     .getPassengers()
     .then(
       (data)=>{
         console.log('Data', data);
         this.passengers = data;
       },(error) =>{
         console.log(error);
       });
  }

  handleRemove(event: Passenger){
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger)=>{
          return passenger.id != event.id
        });
      }, (error)=>{
        console.log(error);
      });
  }

  handleEdit(event: Passenger){
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger)=>{
        this.passengers = this.passengers.map((passenger: Passenger)=>{
          if(passenger.id === event.id){
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      }, (error) => {
      console.log(error);
    });
  }

  handleView(event: Passenger){
    this.router.navigate([`/passengers/${event.id}`])
  }
}


