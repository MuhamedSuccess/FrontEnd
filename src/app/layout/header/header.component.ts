import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  status: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.check_user_login();
  }

  check_user_login() {
    this.status = this.apiService.check_user_exists();
    console.log(this.status);
  }

}
