import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatListComponent } from './boat-list/boat-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'boat-list', component: BoatListComponent},
  { path: '',   redirectTo: '/boat-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
