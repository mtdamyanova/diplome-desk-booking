import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Desk } from 'src/app/interfaces/map';
import { User } from 'src/app/interfaces/user';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookDeskService {
  constructor(
    private signInService: SignInService,
    private http: HttpClient,
    private router: Router
  ) {}

  bookDesk(currentDesk: any, user: any) {
    const date = JSON.parse(localStorage.getItem('period')!);
    let updatedDesk;
    if (!currentDesk.bookedHistory) {
      updatedDesk = {
        ...currentDesk,
        fill: 'orange',
        status: 'booked',
        bookedHistory: [
          {
            userId: user.id,
            date: date,
          },
        ],
      };
    }
    if (currentDesk.bookedHistory && currentDesk.bookedHistory.length > 0) {
      currentDesk.bookedHistory.push({
        userId: user.id,
        date: date,
      });
      updatedDesk = {
        ...currentDesk,
        fill: 'orange',
        status: 'booked',
        bookedHistory: currentDesk.bookedHistory,
      };
    }
    this.updateDeskParams(currentDesk, updatedDesk);
    this.updateUserHistory(currentDesk, date, updatedDesk);
  }

  updateUserHistory(currentDesk: any, date: any, updatedDesk: any) {
    const us = JSON.parse(localStorage.getItem('user')!);
    let updatedUser: any;
    this.signInService.getUsers().subscribe((res) => {
      const user = res.find((user) => (user.id = us.id));
      if (user.bookedDesk && user.bookedDesk.length > 0) {
        user.bookedDesk.push({
          id: user.bookedDesk.length,
          desk: currentDesk.id,
          date: date,
          currentDesk: updatedDesk,
          status: 'upcoming',
        });
        updatedUser = {
          ...user,
          bookedDesk: user.bookedDesk,
        };
      }
      if (!user.bookedDesk) {
        updatedUser = {
          ...user,
          bookedDesk: [
            {
              id: '0',
              date: date,
              currentDesk: updatedDesk,
              status: 'upcoming',
            },
          ],
        };
      }
      this.updateUser(user, updatedUser).subscribe(() => {
        this.router.navigate(['home']);
      });
    });
  }

  updateDeskParams(desk: any, updatedDesk: any) {
    this.signInService.getUsers().subscribe((res) => {
      const currentUser = JSON.parse(localStorage.getItem('user')!);
      const admin = res.find(
        (user) =>
          user.role === 'admin' && user.companyName === currentUser.companyName
      );
      this.updateDesk(admin, desk, updatedDesk).subscribe();
    });
  }

  updateDesk(admin: User, desk: Desk, updatedDesk: Desk) {
    return this.http.put(
      `${url}/users/${admin.id}/desks/${desk.id}.json`,
      updatedDesk
    );
  }

  updateUser(user: User, updatedUser: any) {
    return this.http.put(`${url}/users/${user.id}.json`, updatedUser);
  }
}
