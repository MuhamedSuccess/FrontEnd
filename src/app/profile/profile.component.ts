import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/User';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User: User;

  // localUser: JSON;
   genders = [
    {name: 'male', value: 'M'},
    {name: 'female', value: 'F'},
  ];



   formData = {};
  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    city: new FormControl(''),
    birthDate: new FormControl(''),
    is_guide: new FormControl(false),
    is_tourist: new FormControl(false),
    gender: new FormControl(this.genders[0]),
  });


  constructor(private apiService: ApiService,
              private router: Router,
              private cookieService: CookieService) {

        const mrToken = this.cookieService.get('mr-token');
        if (!mrToken) {
      this.router.navigate(['/account']);
    } else {
        this.loadLocalUser();


    }
  }

  ngOnInit() {

    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/account']);
    } else {
        this.loadLocalUser();
        // console.log(this.User);
    }

     // console.log('Current User: ' + this.User);
  }



  loadLocalUser() {
    const localUser = JSON.parse(localStorage.getItem('current-user'));
    // this.User = localUser;

    this.User = {
        id: localUser.id,
        username: localUser.username,
        email: localUser.email,
        first_name: localUser.profile.first_name,
        last_name: localUser.profile.last_name,
        city: localUser.profile.city,
        birthDate: localUser.profile.birth_date,
        is_tourist: localUser.profile.is_tourist,
        is_guide: localUser.profile.is_guide,
        is_admin: localUser.profile.is_admin,
        sex: localUser.profile.sex,
        token: ''
     };

  }
  saveForm() {
    this.formData = {
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      first_name: this.profileForm.value.first_name,
      last_name: this.profileForm.value.last_name,
      birth_date: this.profileForm.value.birthDate,
      is_guide: this.profileForm.value.is_guide,
      is_tourist: this.profileForm.value.is_tourist,
      city: this.profileForm.value.city,
      sex: this.profileForm.value.gender.value,
    };
    console.log(this.formData);
    // however you don not have to send all user's data because of the partial_update
    this.apiService.updateProfile(this.formData, this.User.id).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }

}
