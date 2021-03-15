import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/models/product';
import { SharedService } from '../../shared/services/shared/shared.service';
import { BooksFacade } from '../../store/app.facade';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Product;
  isShowMore = false;
  bookId: string;
  books: Product[];
  storeSubscription: Subscription;
  constructor(
    private sharedService: SharedService,
    public booksFacade: BooksFacade,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.storeSubscription = this.booksFacade.booksLoaded$.subscribe(
      booksLoaded => {
        this.books = JSON.parse(JSON.stringify(booksLoaded));
      }
    );
    
    this.route.params.subscribe( params => {    
      this.bookId = params.id ;
      /* istanbul ignore next */
      let result = Array.prototype.filter.call(this.books,(v)=>v.id == this.bookId)
      /* istanbul ignore if */
        if (result.length > 0) {
          this.book = result[0];
        }
    });  
  }
  buyNow(book) {
    this.sharedService.buyNow(book);
  }

  addToCart(book) {
    this.sharedService.addToCart(book);
  }
  ngOnDestroy(){
    this.storeSubscription.unsubscribe();
  }
}
