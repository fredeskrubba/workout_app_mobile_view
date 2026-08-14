import { Component, OnInit, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';
import { User } from 'src/app/services/user';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: 'user-info.page.html',
  styleUrls: ['user-info.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonContent],
})
export class UserinfoPage implements OnInit {

  userService = inject(User);
  router = inject(Router);
  user = signal<GetUserResponse | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((res) => {
      this.user.set(res);
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
