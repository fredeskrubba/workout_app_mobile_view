import { Component, computed, input, OnInit } from '@angular/core';
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

  selectedDay = input<string | null>(new Date().toISOString().split('T')[0]);

  selectedDayName = computed(() => this.formatDayName(this.selectedDay()));

  constructor() {
    addIcons({ 'chevron-forward-outline': chevronForwardOutline });
  }

  ngOnInit() {}

  private formatDayName(dateValue: string | null): string {
    if (!dateValue) {
      return 'Today';
    }

    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
}
