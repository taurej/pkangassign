import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'enlight-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss']
})
export class EmptyCartComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
