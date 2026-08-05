import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TabsComponent, TopMenuComponent],
})
export class HomePage {

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

  constructor() {}
}
