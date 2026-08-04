import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { barbell, home, calendar } from 'ionicons/icons';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonContent, IonHeader, IonIcon, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, IonLabel, IonRouterOutlet],
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({ barbell, home, calendar });
   }

  ngOnInit() {}

}
