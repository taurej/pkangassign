import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { SharedService } from '../../shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import {BooksFacade} from '../../store/app.facade';

@Component({
  selector: 'enLight-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems=[];
  totalItems = 0;
  totalPrice = 0;
  storeSubscription: Subscription;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private booksFacade: BooksFacade
    ) { }

  ngOnInit(): void {
    this.storeSubscription = this.booksFacade.cartBooks$.subscribe((cartBooks)=>{
      this.cartItems = JSON.parse(JSON.stringify(cartBooks));
      this.calculateOrderSummary();
    })
  }
  calculateOrderSummary(){
    this.cartItems.map((item)=>{
      this.totalItems = this.totalItems + item.cartQty;
      this.totalPrice = this.totalPrice + item.itemTotal;
  })
  }
  onProceedToBuy(){
    this.booksFacade.addPurchasingBooks(this.cartItems);
    this.router.navigate(['/billingDetails'],{ queryParams: { checkout: true } })
  }
  onIncrementQty(book: any){
    if(book.cartQty){
      book.cartQty++;
      book.itemTotal = book.itemTotal + book.saleInfo?.retailPrice?.amount;
      this.totalItems++;
      this.totalPrice = this.totalPrice + book.saleInfo?.retailPrice?.amount;
    }
  }
  onDecrementQty(book: any ){
    if(book.cartQty > 1){
      book.cartQty--;
      book.itemTotal = book.itemTotal - book.saleInfo?.retailPrice?.amount;
      this.totalItems--;
      this.totalPrice = this.totalPrice - book.saleInfo?.retailPrice?.amount;
    }
  }
  onRemoveCartItem(book:any){
    this.totalItems = 0;
    this.totalPrice = 0;
    this.booksFacade.removeCartItem(book);
  }
  onBookDetails(book){
    this.sharedService.setBookDetail(book);
    this.router.navigate(['/bookDetail'])
  }
  ngOnDestroy(){
    this.storeSubscription.unsubscribe();
  }

}
