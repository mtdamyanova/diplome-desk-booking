import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SignInService } from './sign-in/sign-in-service/sign-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userFirstName: string = '';
  userRole: string = '';
  constructor(private signInService: SignInService) {}

  ngOnInit(): void {
    // this.isLoggedIn();
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.userFirstName = user.firstName;
      this.userRole = user.role;
    }
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.userFirstName = user.firstName;
      this.userRole = user.role;
    }
    return user !== null && user.emailVerified !== false ? true : false;
  }

  onSignOut() {
    this.signInService.signOut();
    this.userFirstName = '';
    this.userRole = '';
  }
}
