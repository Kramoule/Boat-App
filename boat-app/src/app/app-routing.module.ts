import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatListComponent } from './boat-list/boat-list.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '',   redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'boat-list/:username', component: BoatListComponent, canActivate: [AuthGuard]},
  {path: '**',   redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
