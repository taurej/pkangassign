import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { BooksFacade } from '../../store/app.facade';

@Component({
  selector: 'enlight-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.scss']
})
export class MyCollectionComponent implements OnInit, OnDestroy {
  myBooksCollection = [];
  billingDetails:any;
  storeSubscription: Subscription;
  billingSubscription: Subscription;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private booksFacade: BooksFacade
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.booksFacade.myCollectionBooks$.subscribe(
      collectionBooks => {
        this.myBooksCollection = collectionBooks;
      }
    );

    this.billingSubscription = this.booksFacade.billingDetails$.subscribe(
      collectionBilling => {        
        this.billingDetails = collectionBilling;
      }
    );
  }
  onBookDetails(book) {
    this.sharedService.setBookDetail(book);
    this.router.navigate(['/bookDetail']);
  }
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.billingSubscription.unsubscribe();
  }
}
