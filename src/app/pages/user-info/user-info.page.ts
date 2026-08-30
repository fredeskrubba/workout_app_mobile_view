import { Component, OnInit, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonIcon, IonFooter } from '@ionic/angular/standalone';
import { User } from 'src/app/services/user';
import { Auth } from 'src/app/services/auth';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';
import { Router } from '@angular/router';
import { arrowBackOutline, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Session } from 'src/app/services/session';
import { map } from 'rxjs';
import { GetUserSessionsResponse } from 'src/app/models/DTOs/getUserSessionsResponse';
import { WorkoutSession } from 'src/app/models/DTOs/workoutSession';

@Component({
  selector: 'app-user-info',
  templateUrl: 'user-info.page.html',
  styleUrls: ['user-info.page.scss'],
  imports: [IonIcon, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonFooter],
})
export class UserinfoPage implements OnInit {

  userService = inject(User);
  sessionService = inject(Session);
  authService = inject(Auth);
  router = inject(Router);
  user = signal<GetUserResponse | null>(null);
  totalSessions = signal<WorkoutSession[] | null>(null);


  constructor() {
    addIcons({ 'back': arrowBackOutline, "logout": logOutOutline });
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((res) => {
      this.user.set(res);
    });
    
    this.sessionService.getAllUserSessions().subscribe(
      (res) => {
        this.totalSessions.set(res.sessions);
        console.log(res.sessions);
      }
    )
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }


  getTotalSessionsNumber() {
    return this.totalSessions()?.length;
  }

  getTotalExerciseHours(){
    const seconds = this.totalSessions()?.reduce(
      (total, session) => total + session.durationSeconds,
      0
    ) ?? 0;

    return (seconds / 3600).toFixed(1);
  }

 getWeeklyStreak(): number {
  const sessions = this.totalSessions();

  if (!sessions || sessions.length === 0) {
    return 0;
  }

  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    d.setDate(d.getDate() + diff);

    return d;
  };

  const weeks = new Set(
    sessions.map(session =>
      getWeekStart(new Date(session.date)).getTime()
    )
  );

  let currentWeek = getWeekStart(new Date());

  if (!weeks.has(currentWeek.getTime())) {
    currentWeek.setDate(currentWeek.getDate() - 7);
  }

  let streak = 0;

  while (weeks.has(currentWeek.getTime())) {
    streak++;
    currentWeek.setDate(currentWeek.getDate() - 7);
  }

  return streak;
}

}
