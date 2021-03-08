import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { BooksFacade } from '../../store/app.facade';

@Component({
  selector: 'enlight-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  searchString: string;
  books: any[];
  storeSubscription: Subscription;
  errorSubscription: Subscription;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    public booksFacade: BooksFacade
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.booksFacade.booksLoaded$.subscribe(
      booksLoaded => {
        this.books = JSON.parse(JSON.stringify(booksLoaded));
        this.sharedService.loading = false;
      }
    );
    this.errorSubscription = this.booksFacade.booksLoadedError$.subscribe(
      error => {
        if (error != null) {
          this.sharedService.loading = false;
          this.sharedService.openAlertDialog({ message: error });
          this.booksFacade.ClearEffectsError();
        }
      }
    );
  }

  onSearchBooks(searchString: string) {
    if (searchString) {
      this.sharedService.loading = true;
      this.booksFacade.storeSearchStringInStore(searchString);
      this.booksFacade.loadSearchBooks(searchString);
    }
  }
  onBuyNow(book) {
    this.sharedService.onBuyNow(book);
  }
  onAddToCart(book) {
    this.sharedService.onAddToCart(book);
  }
  onBookDetails(book) {
    this.sharedService.setBookDetail(book);
    this.router.navigate(['/bookdetail']);
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
