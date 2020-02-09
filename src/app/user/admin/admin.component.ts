import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.apiService.check_user_login();
    console.log(this.user);
    if (!this.user.is_admin == true) {
      this.router.navigate(['../../trips']);
    }
  }

}
