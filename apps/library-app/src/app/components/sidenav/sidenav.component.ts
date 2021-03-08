import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../../store/app.facade';

@Component({
  selector: 'angwork-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(public booksFacade: BooksFacade) {}

  ngOnInit(): void {}
}
