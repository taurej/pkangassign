import { Component } from '@angular/core';
import { BooksFacade } from '../../store/app.facade';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(public booksFacade: BooksFacade) {}
}
