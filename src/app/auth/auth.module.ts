import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from '../profile/profile.module';

const routes: Routes = [
  {path: 'account', component: AuthComponent}
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ProfileModule
  ], exports: [
    RouterModule
  ]
})
export class AuthModule { }
