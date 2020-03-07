import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from './api.service';

import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';
import {User} from './models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  status = false;
  selected: {startDate: '12/2/1880', endDate: '30/12/2050'};


  // @Input() isAuthenticated = false;
  userSub: Subscription;
  username = '';
  // User: User;

  @Output() loggedUser = new EventEmitter();
  constructor(private apiService: ApiService,
              private authService: AuthService,
              ) {

  }

  ngOnInit(): void {
    this.authService.autoLogin();


  }




}
