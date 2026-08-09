import { Component, OnInit, input } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { GetUserResponse } from 'src/app/models/DTOs/getUserResponse';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  imports: [IonIcon, IonButton, IonButtons, IonHeader, IonToolbar],
})
export class TopMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  user = input<GetUserResponse | null>(null);

  get initials(): string {
    const firstName = this.user()?.firstName?.trim() ?? '';
    const lastName = this.user()?.lastName?.trim() ?? '';
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';

    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
  }

}
