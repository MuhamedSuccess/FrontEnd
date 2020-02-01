import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import {RouterModule, Routes} from '@angular/router';
import {ApiService} from '../api.service';

const routes: Routes = [
  {path: 'trips', component: TripComponent}
];


@NgModule({
  declarations: [TripComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ], exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class TripModule { }
