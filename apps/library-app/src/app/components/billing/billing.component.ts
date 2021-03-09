import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../../store/app.facade';
import { SharedService } from '../../shared/services/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface BillingData {
  fname: string;
  address: string;
  mobile: string;
  email: string;
}

@Component({
  selector: 'enlight-billing-detail',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  billingDetails: BillingData = {
    fname: '',
    address: '',
    mobile: '',
    email: ''
  };
  checkout = 'false';

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booksFacade: BooksFacade
  ) {}

  ngOnInit(): void {
    this.checkout = this.activatedRoute.snapshot.queryParams['checkout'];
  }

  onBillingSubmit() {
    if (this.checkout === 'true') {
      this.booksFacade.removeAllCartItems();
    }
    this.booksFacade.addBillingDetailsToStore(this.billingDetails);
    this.sharedService.openAlertDialog({
      message: 'Book(s) purchased successfully',
      onCloseHandler: this.navToDashboard
    });
  }

  navToDashboard = () => {
    this.router.navigate(['myCollection']);
  };
}
