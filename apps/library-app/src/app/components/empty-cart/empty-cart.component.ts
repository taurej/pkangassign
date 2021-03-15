import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss']
})
export class EmptyCartComponent {
  constructor(private router: Router) {}
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
