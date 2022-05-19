import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/header/sign-in/sign-in-service/sign-in.service';
import { Desk } from 'src/app/interfaces/map';
import { User } from 'src/app/interfaces/user';
import { OfficePlanService } from 'src/app/office-plan/office-plan-service/office-plan.service';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManipulateDeskService {
  constructor(
    private signInService: SignInService,
    private http: HttpClient,
    private router: Router,
    private officePlanService: OfficePlanService
  ) {}

  bookDesk(currentDesk: any, user: any, status: string) {
    const date = JSON.parse(localStorage.getItem('period')!);
    let updatedDesk;
    if (!currentDesk.bookedHistory) {
      updatedDesk = {
        ...currentDesk,
        bookedHistory: [
          {
            userId: user.id,
            userName: user.firstName,
            date: date,
            status: status,
          },
        ],
      };
    }
    if (currentDesk.bookedHistory && currentDesk.bookedHistory.length > 0) {
      currentDesk.bookedHistory.push({
        userId: user.id,
        date: date,
        userName: user.firstName,
        status: status,
      });
      updatedDesk = {
        ...currentDesk,
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
      const user = res.find((user) => user.id === us.id);
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

  unbookOrCheckedInDesk(admin: any, data: any, status: string, dialogRef: any) {
    if (admin.desks) {
      const desk = admin.desks.find(
        (d: Desk) => d.id == data.currentDesk.currentDesk.id
      );
      const index = desk.bookedHistory.findIndex(
        (d: Desk) =>
          d.userId === data.user.id && d.date === data.currentDesk.date
      );

      this.officePlanService.deleteOrCheckedInDeskBooked(
        admin,
        desk.id,
        index,
        status
      );
    }
    this.officePlanService
      .updateUserDeskHistory(data.user, data.currentDesk.id, {
        ...data.currentDesk,
        status: status,
      })
      .subscribe((res) => {
        dialogRef.close(res);
      });
  }
}
