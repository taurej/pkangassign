import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import * as fromApp from '../../../store/app.reducer';
import { BooksFacade } from '../../../store/app.facade';
import { readFirst } from '@nrwl/angular/testing';

describe('SharedService', () => {
  let service: SharedService;
  let booksFacade: BooksFacade;
  let router: Router;

  beforeEach(() => {
    @NgModule({
      declarations: [AlertDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      entryComponents: [AlertDialogComponent]
    })
    class TestModule {}
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        TestModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({ books: fromApp.appReducer })
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set the BookData on call of  setBookDetail method', () => {
    const book = { id: 1 };
    service.setBookDetail(book);
    expect(service.bookData).toBe(book);
  });
  it('should return the BookData which we set with setBookDetail method', () => {
    const book = { id: 1 };
    service.setBookDetail(book);
    expect(service.getBookDetail()).toBe(book);
  });
  it('onAddToCart() should ADD book to cart if stock available and navigate to cart page', async () => {
    booksFacade = TestBed.inject(BooksFacade);
    router = TestBed.inject(Router);
    const book = {id: 1 };
    const spy = spyOn(router, 'navigate');
    service.onAddToCart(book);
    const cartItems = await readFirst(booksFacade.cartBooks$);
    expect(cartItems.length).toBe(1);
    expect(spy).toHaveBeenCalledWith(['/cart']);
  });

  it('onBuyNow() should ADD book purchasingBooks in store if stock available and navigate to billing details page', async () => {
    booksFacade = TestBed.inject(BooksFacade);
    router = TestBed.inject(Router);
    const book = { saleInfo: { saleability: 'FOR_SALE' } };
    const spy = spyOn(router, 'navigate');
    service.onBuyNow(book);
    const purchasingBooks = await readFirst(booksFacade.purchasingBooks$);
    expect(purchasingBooks.length).toBe(1);
    expect(spy).toHaveBeenCalledWith(['/billingDetails'], {
      queryParams: { checkout: false }
    });
  });
  it('should open loading spinner if loading set to true', () => {
    service.loading = true;
  });
  it('should hide loading spinner if loading set to false', () => {
    service.loading = false;
  });
});
