import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { BooksFacade } from '../../store/app.facade';
import { Billing } from '../../shared/models/Billing';

@Component({
  selector: 'app-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.scss']
})
export class MyCollectionComponent implements OnInit, OnDestroy {
  myBooksCollection = [];
  billingDetails:Billing;
  storeSubscription: Subscription;
  billingSubscription: Subscription;
  countSubscription: Subscription;
  collectionBooks: number;
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
    this.countSubscription = this.booksFacade.itemsCount$.subscribe(
      countCollectionBooks => {
        this.collectionBooks = JSON.parse(JSON.stringify(countCollectionBooks.myCollectionCount));
      }
    );
    this.billingSubscription = this.booksFacade.billingDetails$.subscribe(
      collectionBilling => {        
        this.billingDetails = collectionBilling;
      }
    );
  }
  bookDetails(book) {
    this.sharedService.setBookDetail(book);
    this.router.navigate(['/bookDetail',book.id]);
  }
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.billingSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
  }
}
