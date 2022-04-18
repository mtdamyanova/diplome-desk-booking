import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawOfficeMapComponent } from './admin-role/draw-office-map/draw-office-map.component';
import { LoginHelpComponent } from './header/login-help/login-help.component';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { SignUpComponent } from './header/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'office-plan', component: DrawOfficeMapComponent },
  { path: 'login-help', component: LoginHelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
