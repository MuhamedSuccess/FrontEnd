import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {User} from '../models/User';
interface TokenObj {
    token: string;
 }

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  User = {};
  userTypes = [
    {name: 'tourist', value: 'tourist'},
    {name: 'guide', value: 'guide'},
  ];
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    // userType: new FormControl(this.userTypes[0])
  });

  formData = {};
  @Output() registerMode = new EventEmitter();

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router
  ) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/trips']);
    }
  }

  loginForm() {

      this.loginUser();

  }


  loginUser() {

    const data = {
      username: this.authForm.value.username,
      password: this.authForm.value.password
    };
    console.log(data);
    this.authService.loginUser(data).subscribe(
      result => {
        // console.log(this.authForm.value);
        console.log('User: ' + JSON.stringify(result));
        const user: string = JSON.stringify(result);
        this.getUser(JSON.parse(user).id);

        this.cookieService.set('mr-token', JSON.parse(user).token);
        this.registerMode.emit(true);
        this.router.navigate(['/trips']);
        // window.location.reload();
      },
      error => console.log(error)
    );
  }

  getUser(id) {
    this.authService.getUser(id).subscribe(
      (user: User)  => {
        // this.User = user;
        localStorage.setItem('current-user', JSON.stringify(user));
    },
      error => {console.log(error); }
    );
  }

}
