import { Component, OnInit, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { User } from 'src/app/services/user';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';
import { Router } from '@angular/router';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-user-info',
  templateUrl: 'user-info.page.html',
  styleUrls: ['user-info.page.scss'],
  imports: [IonIcon, IonHeader, IonToolbar, IonButtons, IonButton, IonContent],
})
export class UserinfoPage implements OnInit {

  userService = inject(User);
  router = inject(Router);
  user = signal<GetUserResponse | null>(null);

  constructor() {
    addIcons({ 'back': arrowBackOutline });
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((res) => {
      this.user.set(res);
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
