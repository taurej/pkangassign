import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { SharedService } from '../../shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import {BooksFacade} from '../../store/app.facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems=[];
  totalItems = 0;
  totalPrice = 0;
  storeSubscription: Subscription;
  page:string;
  cartCountSubscription: Subscription;
  cartBookCount:number;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private booksFacade: BooksFacade
    ) { }

  ngOnInit(): void {
    this.storeSubscription = this.booksFacade.cartBooks$.subscribe((cartBooks)=>{
      this.cartItems = JSON.parse(JSON.stringify(cartBooks));
      this.calculateOrderSummary();
    });
    this.page = 'cart';
    this.cartCountSubscription = this.booksFacade.itemsCount$.subscribe(
      countCartBooks => {
        let bookCount = JSON.parse(JSON.stringify(countCartBooks));
        this.cartBookCount = bookCount.cartCount;
      }
    );
  }
  calculateOrderSummary(){
    this.cartItems.map((item)=>{
      this.totalItems = this.totalItems + item.cartQty;
      this.totalPrice = this.totalPrice + item.itemTotal;
  })
  }
  proceedToBuy(){
    this.booksFacade.addPurchasingBooks(this.cartItems);
    this.router.navigate(['/billingDetails'],{ queryParams: { checkout: true } })
  }
  removeCartItem(book:any){
    this.totalItems = 0;
    this.totalPrice = 0;
    this.booksFacade.removeCartItem(book);
  }
  bookDetails(book){
    //this.sharedService.setBookDetail(book);
    this.router.navigate(['/bookDetail', book.id])
  }
  ngOnDestroy(){
    this.storeSubscription.unsubscribe();
    this.cartCountSubscription.unsubscribe();
  }

}
