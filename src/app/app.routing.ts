import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeesComponent } from './admin-role/add-employees/add-employees.component';
import { DrawOfficeMapComponent } from './admin-role/draw-office-map/draw-office-map.component';
import { LoginHelpComponent } from './header/login-help/login-help.component';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { SignUpComponent } from './header/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { OfficePlanComponent } from './office-plan/office-plan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'draw-plan', component: DrawOfficeMapComponent },
  { path: 'login-help', component: LoginHelpComponent },
  { path: 'register-employee', component: AddEmployeesComponent },
  { path: 'office-plan', component: OfficePlanComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
