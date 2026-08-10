import { Component, OnInit } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-today-session-card',
  templateUrl: './today-session-card.html',
  styleUrls: ['./today-session-card.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon]
})
export class TodaySessionCard implements OnInit {

  constructor() {
    addIcons({ 'chevron-forward-outline': chevronForwardOutline });
  }

  ngOnInit() {}

}
