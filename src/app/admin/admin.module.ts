import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {UsersPageComponent} from './users-page/users-page.component';
import { UserComponent } from './shared/user/user.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UsersPageComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/login', pathMatch: 'full'},
          {path: 'users', component: UsersPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})

export class AdminModule {
}
