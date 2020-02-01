import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  private trips: any = [];
  constructor(
    private apiservice: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
     const mr_token = this.cookieService.get('mr-token');
     if (!mr_token) {
      this.router.navigate(['/account']);
    } else {
       this.apiservice.getTrips().subscribe(
      data => {
        this.trips = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
    }
  }

  tripClicked(trip){
    console.log(trip);
  }
  goProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.cookieService.delete('mr-token');
    localStorage.removeItem('current-user');
    this.router.navigate(['/account']);
  }

}
