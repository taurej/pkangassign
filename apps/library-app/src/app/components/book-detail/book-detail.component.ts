import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared/shared.service';

@Component({
  selector: 'enlight-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: any;
  isShowMore = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.book = this.sharedService.getBookDetail();
  }
  onBuyNow(book) {
    this.sharedService.onBuyNow(book);
  }

  onAddToCart(book) {
    this.sharedService.onAddToCart(book);
  }
}
