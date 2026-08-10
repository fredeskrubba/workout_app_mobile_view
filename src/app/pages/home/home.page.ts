import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { User } from 'src/app/services/user';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';
import { TodaySessionCard } from 'src/app/components/homepage/today-session-card/today-session-card';
import { Session } from 'src/app/services/session';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonContent, TopMenuComponent, TodaySessionCard],
})
export class HomePage implements OnInit {

  constructor() {
     
  }
  
  userService = inject(User);
  sessionService = inject(Session);
  user = signal<GetUserResponse | null>(null);

  ngOnInit(): void {
    this.getUserInfo().subscribe((res) => {
      this.user.set({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email
      });
    });

    this.getUserSessions().subscribe((res)=> {
      console.log(res);
    })
  }
  

  weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    const day = date.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;

    date.setDate(date.getDate() + mondayOffset + i);

    return {
      id: i + 1,
      name: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: date.toISOString().split("T")[0],
      sessionRegistered: true
    };
  });

  getUserInfo(){
    return this.userService.getUserInfo();
  }

  getUserSessions(){
    return this.sessionService.getAllUserSessions();
  }
  
}
