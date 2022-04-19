import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app.routing';
import { DrawOfficeMapComponent } from './admin-role/draw-office-map/draw-office-map.component';
import { HttpClientModule } from '@angular/common/http';
import { DraggableDirective } from './admin-role/draw-office-map/draggable-directive/draggable.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { SignUpComponent } from './header/sign-up/sign-up.component';
import { LoginHelpComponent } from './header/login-help/login-help.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AddEmployeesComponent } from './admin-role/add-employees/add-employees.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';


@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    DrawOfficeMapComponent,
    DraggableDirective,
    LoginHelpComponent,
    AddEmployeesComponent,
      EmployeeRoleComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment),
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
