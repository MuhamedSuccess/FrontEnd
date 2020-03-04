import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {UserService} from "../user.service";
import {ProfileService} from "../../profile/profile.service";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import {User} from '../../models/User';

export interface UserOption {
  name: string;
  id: string;
}

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})

export class GuideComponent implements OnInit {

  //  userList = [
  //   {name: 'tourist', value: 'tourist'},
  //   {name: 'guide', value: 'guide'},
  // ];
  // guideForm = new FormGroup({
  //   user: new FormControl(this.userList[0])
  // });

  form: FormGroup;

  userList: UserOption[] = [{id: '', name: ''}];
  users = [];
  user: User;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private profileService: ProfileService
              ) {
    this.form = this.formBuilder.group({
      userList: ['']
    });
    this.getAllUsers();

  }

  fillUsers(users) {
    const users_mini = [];
    for (const user of users) {
      // const input = JSON.stringify(user);
      // this.users.push(user);



      if (user.profile.is_tourist === false && user.profile.is_guide === false) {
        this.users.push({id: user.id, name: user.username});
      }

    }
    // console.log('User List: ' + this.users[0].id);
    this.userList = this.users;
    this.userList.shift(); // remove first element from array
    this.form.controls.userList.patchValue(this.userList[0].id);


  }
  getAllUsers() {

    this.userService.getAllUsers().subscribe(
      result => {
        this.fillUsers(result);
        // console.log(result);
      },
      error => {console.log(error); }
    );
  }
  ngOnInit() {
  }

  createGuide() {
    console.log(this.form.value.userList);
    const id = this.form.value.userList;


    this.getUserProfile(id);

  }

  updateProfile(user) {
     user.is_guide = true;
     this.profileService.updateProfile(user, user.id).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }

  getUserProfile(id) {

    this.profileService.getUserProfile(id).subscribe(
      (result: User) => {

        console.log(result);
        this.updateProfile(result);

      }, error => {console.log(error); }
    );


  }

}
