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
  user: any;
  constructor(private signInService: SignInService) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    this.signInService.castUser.subscribe((res) => {
      this.user = res;
    });
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.user = user;
    }
  }

  onSignOut() {
    this.signInService.signOut();
    this.user = {};
  }
}
