import { Component, OnInit } from '@angular/core';
import { SignInService } from '../header/sign-in/sign-in-service/sign-in.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userBookedDeskHistory: any[] = [];
  public userRole: string = '';
  constructor(private signInService: SignInService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.signInService.getUsers().subscribe((res) => {
      const currentUser = res.find((us) => us.id === user.id);
      this.userBookedDeskHistory = currentUser.bookedDesk;
      this.userRole = currentUser.role;
    });
  }
}
