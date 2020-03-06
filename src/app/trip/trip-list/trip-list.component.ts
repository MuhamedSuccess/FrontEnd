import { Component, OnInit } from '@angular/core';
import {TripService} from '../trip.service';
import {Subscription} from 'rxjs';
import {Trip} from '../trip.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: Trip [];
  subscription: Subscription;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.subscription = this.tripService.getAllTrips().subscribe(
      (result: Trip[]) => {
        this.trips = result;
      },
      error => {console.log(error); }
    );
  }

}
