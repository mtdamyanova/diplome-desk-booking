import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
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
    this.isLoggedIn().subscribe();
  }

  isLoggedIn() {
    return this.signInService.castUser.pipe(
      tap((res) => (this.user = res)),
      tap(() => {
        const user = JSON.parse(localStorage.getItem('user')!);
        user ? (this.user = user) : null;
      })
    );
  }

  onSignOut() {
    this.signInService.signOut();
    this.user = {};
  }
}
