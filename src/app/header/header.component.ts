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
export class HeaderComponent implements AfterViewInit {
  userFirstName: string = '';
  constructor(private signInService: SignInService) {}

  ngAfterViewInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.userFirstName = user.firstName;
    }
    return user !== null && user.emailVerified !== false ? true : false;
  }

  onSignOut() {
    this.signInService.signOut();
    this.userFirstName = '';
  }
}
