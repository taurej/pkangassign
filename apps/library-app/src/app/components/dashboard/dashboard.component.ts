import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { BooksFacade } from '../../store/app.facade';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  searchString: string;
  books: Product[];
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
        /* istanbul ignore if */
        if (error != null) {
          this.sharedService.loading = false;
          this.sharedService.openAlertDialog({ message: error });
          this.booksFacade.ClearEffectsError();
        }
      }
    );
  }

  searchBooks(searchString: string) {
    if (searchString) {
      this.sharedService.loading = true;
      this.booksFacade.storeSearchStringInStore(searchString);
      this.booksFacade.loadSearchBooks(searchString);
    }
  }
  buyNow(book) {
    this.sharedService.buyNow(book);
  }
  addToCart(book) {
    this.sharedService.addToCart(book);
  }
  bookDetails(book) {
    //this.sharedService.setBookDetail(book);
    this.router.navigate(['/bookDetail/',book.id]);
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
