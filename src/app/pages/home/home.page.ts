import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { User } from 'src/app/services/user';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';
import { TodaySessionCard } from 'src/app/components/homepage/today-session-card/today-session-card';
import { Session } from 'src/app/services/session';
import { WorkoutSession } from 'src/app/models/DTOs/workoutSession';
import { DatePipe } from '@angular/common';
import { DurationPipe } from 'src/app/pipes/duration-pipe';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonContent, IonIcon, TopMenuComponent, TodaySessionCard, DatePipe, DurationPipe],
})
export class HomePage implements OnInit {

  
  
  userService = inject(User);
  sessionService = inject(Session);
  user = signal<GetUserResponse | null>(null);
  workoutSessions = signal<WorkoutSession[]>([]);
  selectedDate = signal<string | null>(null);
  
  constructor() {
    addIcons({ 'star': star });
    this.selectedDate.set(this.getTodayDateString());
  }


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
      this.workoutSessions.set(res.sessions);
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
      date: date.toISOString().split("T")[0]
    };
  });

  getUserInfo(){
    return this.userService.getUserInfo();
  }

  getUserSessions(){
    return this.sessionService.getAllUserSessions();
  }

  dayHasWorkoutSession(day: { date: string }): boolean {
    return this.workoutSessions().some(session =>
      session.date.substring(0, 10) === day.date
    );
  }

  getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  isSelectedDay(day: { date: string }): boolean {
    return this.selectedDate() === day.date;
  }

  setSelectedDate(date: string) {
    this.selectedDate.set(date);
  }
}
