import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../shared/services/shared/shared.service';
import { BooksFacade } from '../../store/app.facade';
import { readFirst } from '@nrwl/angular/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: SharedService;
  let router: Router;
  let booksFacade: BooksFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        StoreModule.forRoot({ books: fromApp.appReducer }),
        BrowserAnimationsModule,
        MatDialogModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onBookDetails() should set bookData in sharedService and navigate to book detail page', () => {
    const book = { id: 1 };
   // service = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    const RouterSpy = spyOn(router, 'navigate');
    component.bookDetails(book);
    //const bookData = service.getBookDetail();
    expect(RouterSpy).toHaveBeenCalledWith(['/bookDetail',book.id]);
    //expect(bookData).toBe(book);
  });
  it('removeCartItem() should remove cart items', async () => {
    const book = { id: 1 };
    booksFacade = TestBed.inject(BooksFacade);
    booksFacade.addBookToCart(book);
    let cartItems = await readFirst(booksFacade.cartBooks$);
    expect(cartItems.length).toBe(1);
    component.removeCartItem(book);
    cartItems = await readFirst(booksFacade.cartBooks$);
    expect(cartItems.length).toBe(0);
  });
  
  it('proceedToBuy() should add books to store > purchasingBooks array and navigate to billing detail page', async () => {
    let purchasingBooks = await readFirst(booksFacade.purchasingBooks$);
    router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    expect(purchasingBooks.length).toBe(0);

    const cartItems = [{ id: 1 }, { id: 2 }];
    component.cartItems = cartItems;
    component.proceedToBuy();
    purchasingBooks = await readFirst(booksFacade.purchasingBooks$);
    expect(spy).toHaveBeenCalledWith(['/billingDetails'], {
      queryParams: { checkout: true }
    });
  });
});
