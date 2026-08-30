import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { User } from 'src/app/services/user';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.page.html',
  styleUrls: ['./routines.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TopMenuComponent]
})
export class RoutinesPage implements OnInit {

  constructor() { }

  userService = inject(User);

  user = signal<GetUserResponse | null>(null);

  ngOnInit() {
    this.getUserInfo().subscribe((res) => {
      this.user.set({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email
      });
    });
  }

   getUserInfo(){
    return this.userService.getUserInfo();
  }
}
