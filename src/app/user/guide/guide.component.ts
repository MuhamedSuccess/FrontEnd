import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

   userList = [
    {name: 'tourist', value: 'tourist'},
    {name: 'guide', value: 'guide'},
  ];
  guideForm = new FormGroup({
    user: new FormControl(this.userList[0])
  });

  form: FormGroup;
  users = [];
  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) {
    this.form = this.formBuilder.group({
      users: ['']
    });
    this.getAllUsers();
  }

  getAllUsers() {
    this.apiService.getAllUsers().subscribe(
      result => {
        console.log(result);
      },
      error => {console.log(error); }
    );
  }
  ngOnInit() {
  }

  createGuide() {
    console.log(this.guideForm.value);
  }

}
