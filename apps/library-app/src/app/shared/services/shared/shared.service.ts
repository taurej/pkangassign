import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { BooksFacade } from '../../../store/app.facade';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  bookData = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private booksFacade: BooksFacade
    ) {}

  openAlertDialog(data:{message: string,onCloseHandler?:any}){
    const dialogRef = this.dialog.open(AlertDialogComponent, {
          width: '350px',
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          if(data.onCloseHandler){
            data.onCloseHandler();
          }
        });
  }
  onBuyNow(book){
      this.booksFacade.addPurchasingBooks([book]);
      this.router.navigate(['/billingDetails'],{ queryParams: { checkout: false } });
  }
  onAddToCart(book){
      book.cartQty = 1;
      book.itemTotal = book.saleInfo?.retailPrice?.amount;
      this.booksFacade.addBookToCart(book);
      this.router.navigate(['/cart']);

  }
  setBookDetail(book){
    this.bookData = book;
  }
  getBookDetail(){
    return this.bookData;
  }
  set loading(display){
    const loadingElement: HTMLElement = document.getElementById('overlay');
      if(display && loadingElement){
        loadingElement.style.display = 'block';
      }else if(loadingElement){
        loadingElement.style.display = 'none';
      }
  }
}
