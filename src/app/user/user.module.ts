import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AdminComponent } from './admin/admin.component';
import { GuideComponent } from './guide/guide.component';
import {Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'users', component: UserComponent},
  {path: 'guide', component: GuideComponent}
];


@NgModule({
  declarations: [UserComponent, AdminComponent, GuideComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ]
})
export class UserModule { }
