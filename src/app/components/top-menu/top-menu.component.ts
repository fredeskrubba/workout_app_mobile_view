import { Component, OnInit } from '@angular/core';
import { IonFooter, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  imports: [IonIcon, IonButton, IonButtons, IonFooter, IonHeader, IonTitle, IonToolbar],
})
export class TopMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
