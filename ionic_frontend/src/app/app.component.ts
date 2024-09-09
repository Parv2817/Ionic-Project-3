import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Main', url: '/main', icon: 'star' },
    { title: 'Listing', url: '/listing', icon: 'document' },
    { title: 'Add/Update', url: '/update', icon: 'create' },
  ];

  constructor() {}
}
