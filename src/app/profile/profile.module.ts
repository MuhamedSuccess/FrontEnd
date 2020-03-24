import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {AuthComponent} from '../auth/auth.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import {SharedModule} from '../shared/shared.module';
import { PrefrencesComponent } from './prefrences/prefrences.component';
const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'profile-update', component: ProfileUpdateComponent}
];


@NgModule({
  declarations: [ProfileComponent, ProfileUpdateComponent, PrefrencesComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // ReactiveFormsModule,
    // FormsModule,
    RouterModule.forChild(routes),

  ], exports: [
    RouterModule
  ]
})
export class ProfileModule { }
