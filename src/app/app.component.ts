import {Component} from '@angular/core';
import {Message} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }

  public message: Message[] = [];
  title = 'ticketsSalesAngular';
}
