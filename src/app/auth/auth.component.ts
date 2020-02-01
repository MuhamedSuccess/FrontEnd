import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
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

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    userType: new FormControl(this.userTypes[0])
  });

  formData = {};
  registerMode = false;
  constructor(private apiService: ApiService,
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

  registerUser() {
    // console.log(this.authForm.value);
    if (this.registerForm.value.userType === 'tourist') {
        this.formData = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        is_tourist: true,
        first_name: 'd',
        last_name: 'd',
        sex: 'M'
      };
      } else {
        this.formData = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        is_guide: true,
        first_name: 'd',
        last_name: 'd',
        sex: 'M'
      };
      }

    console.log(this.formData);

    this.apiService.registerUser(this.formData).subscribe(
      (user: User) => {
          this.updateProfile(user.id, this.formData);
          localStorage.setItem('user-session', JSON.stringify(user));
          console.log(user);
          this.logUserFromRegister();
      },
      error => console.log(error)
    );
  }

  updateProfile(id, data) {
    this.apiService.updateProfile(data, id).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }
  logUserFromRegister() {
    const data = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    console.log(data);
    this.apiService.loginUser(data).subscribe(
      result => {
        // console.log(this.authForm.value);
        console.log('User: ' + JSON.stringify(result));
        const user: string = JSON.stringify(result);
        localStorage.setItem('current-user', user);
        this.cookieService.set('mr-token', JSON.parse(user).token);
        this.router.navigate(['/trips']);
      },
      error => console.log(error)
    );
  }

  loginUser() {

    const data = {
      username: this.authForm.value.username,
      password: this.authForm.value.password
    };
    console.log(data);
    this.apiService.loginUser(data).subscribe(
      result => {
        // console.log(this.authForm.value);
        console.log('User: ' + JSON.stringify(result));
        const user: string = JSON.stringify(result);
        this.getUser(JSON.parse(user).id);

        this.cookieService.set('mr-token', JSON.parse(user).token);
        this.router.navigate(['/trips']);
      },
      error => console.log(error)
    );
  }

  getUser(id) {
    this.apiService.getUser(id).subscribe(
      (user: User)  => {
        // this.User = user;
        localStorage.setItem('current-user', JSON.stringify(user));
    },
      error => {console.log(error); }
    );
  }

}
