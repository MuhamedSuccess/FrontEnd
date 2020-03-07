import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/User';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  User;
  userSub: Subscription;
  avatar = '';
  selectedFile: File;

  // localUser: JSON;
  genders = [
    {name: 'male', value: 'M'},
    {name: 'female', value: 'F'},
  ];

  updatedUser: User;
  Score = 0;
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
              private cookieService: CookieService,
              private authService: AuthService,
              private profileService: ProfileService
  ) {

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
      if (this.User.avatar) {
        this.avatar = this.User.avatar;
      } else {
        this.avatar = 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg';
      }
      // console.log(this.User);
    }

    // console.log('Current User: ' + this.User);
  }


  loadLocalUser() {
    // this.authService.loadLocalUser();
    this.userSub = this.authService.current_user.subscribe(
      user => {
        this.User = user;

      }
    );

  }

  saveForm() {

    console.log(this.profileForm.value);
    this.formData = {
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      profile: {
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        birth_date: this.profileForm.value.birthDate,
        is_guide: true,
        city: this.profileForm.value.city,
        sex: this.profileForm.value.gender.value,
      },

    };

    // is_guide: this.profileForm.value.profile.is_guide,
    //   is_tourist: this.profileForm.value.profile.is_tourist,
    console.log(this.formData);
    // however you don not have to send all user's data because of the partial_update
    let userSub: Subscription;
    let profileSub: Subscription;
    let flag = 0;

    userSub = this.apiService.updateProfile({
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
    }, this.User.id).subscribe(
      (result: User) => {
        // this.updatedUser.username = result.username;
        // this.updatedUser.email = result.email;
        console.log(result);
        flag = 1;
        this.Score = 1;
      },
      error => console.log(error)
    );

    profileSub = this.profileService.updateUserProfile({
      first_name: this.profileForm.value.first_name,
      last_name: this.profileForm.value.last_name,
      birth_date: this.profileForm.value.birthDate,
      is_guide: true,
      city: this.profileForm.value.city,
      sex: this.profileForm.value.gender.value,
    }, this.User.id).subscribe(
      (result: User) => {
        console.log(result);
        // this.updatedUser.first_name = result.first_name;
        // this.updatedUser.last_name = result.last_name;
        // this.updatedUser.birth_date = result.birth_date;
        // this.updatedUser.is_guide = result.is_guide;
        // this.updatedUser.city = result.city;
        // this.updatedUser.sex = result.sex;

        flag = flag + 1;
        this.Score = this.Score + 1;
        this.applyUpdate(this.User.id);

      },
      error => console.log(error)
    );


    // if (this.Score == 2) {
    //   // this.authService.current_user.next(this.updatedUser);
    //   this.applyUpdate(this.User.id);
    // }


  }


  applyUpdate(id) {
    this.userSub = this.authService.loadLocalUser(id).subscribe(
      (user: User) => {
        console.log(user);
        this.authService.current_user.next(user);
        console.log(this.authService.current_user);
      }
    );
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
    // this.User.avatar = this.selectedFile.name;

    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.User.profile.avatar = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }

  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userSub.unsubscribe();
  }

}
