import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../api.service';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: 'account', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ], exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class AuthModule { }
