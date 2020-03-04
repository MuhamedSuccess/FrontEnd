import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {User} from '../../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    // this.user = this.authService.check_user_login();
    // console.log(this.user);
    // if (!this.user.is_admin == true) {
    //   this.router.navigate(['../../trips']);
    // }
  }

}
