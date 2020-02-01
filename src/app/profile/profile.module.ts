import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {AuthComponent} from '../auth/auth.component';
import {Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {path: 'profile', component: ProfileComponent}
];


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ], exports: [
    RouterModule
  ]
})
export class ProfileModule { }
