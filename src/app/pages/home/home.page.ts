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
  constructor() {}
}
