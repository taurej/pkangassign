import { TestBed, async } from '@angular/core/testing';
import { BooksFacade } from './app.facade';
import * as fromApp from './app.reducer';
import { AppEffects } from './app.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
describe('BooksFacade', () => {
  let booksFacade: BooksFacade;
  let store: Store<fromApp.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NxModule.forRoot(),
        RouterModule.forRoot([]),
        StoreModule.forRoot({ books: fromApp.appReducer }),
        EffectsModule.forRoot([AppEffects])
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
    booksFacade = TestBed.inject(BooksFacade);
    store = TestBed.inject(Store);
    booksFacade = TestBed.inject(BooksFacade);
  });

  it('should be created', () => {
    expect(booksFacade).toBeTruthy();
  });
  it('searchString$ should give empty string initially', async done => {
    try {
      const searchString = await readFirst(booksFacade.searchString$);
      expect(searchString).toBe(''); // initially empty
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('searchString$ should give saved search string from store', async done => {
    try {
      booksFacade.storeSearchStringInStore('nodejs');
      const searchString = await readFirst(booksFacade.searchString$);

      expect(searchString).toBe('nodejs');
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('booksLoaded$ should give empty books list initially', async done => {
    try {
      const booksLoaded = await readFirst(booksFacade.booksLoaded$);
      expect(booksLoaded.length).toBe(0);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('booksLoaded$ should give search results when user search for books', async done => {
    try {
      const booksData = { items: [1, 2, 3] };
      let booksLoaded = await readFirst(booksFacade.booksLoaded$);
      expect(booksLoaded.length).toBe(0); //initially should be 0

      booksFacade.loadSearchBooks('nodejs');
      store.dispatch(booksFacade.storeSearchBooks(booksData));

      booksLoaded = await readFirst(booksFacade.booksLoaded$);
      expect(booksLoaded).toStrictEqual([1, 2, 3]);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('addBookToCart() should add book to cart items', async done => {
    try {
      const book = { id: 1 };
      let cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(0); //cart items initially 0

      booksFacade.addBookToCart(book);
      cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks).toContain(book);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('removeAllCartItems() should remove all cart items', async done => {
    try {
      const book1 = { id: 1 };
      const book2 = { id: 2 };
      let cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(0); //cart items initially 0

      booksFacade.addBookToCart(book1);
      booksFacade.addBookToCart(book2);

      cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(2); // added two items

      booksFacade.removeAllCartItems();
      cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(0); //removed all itmes
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('removeCartItem() should remove book from cart items', async done => {
    try {
      const book = { id: 1 };
      let cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(0); //cart items initially 0

      booksFacade.addBookToCart(book);
      cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(1);

      booksFacade.removeCartItem(book);
      cartBooks = await readFirst(booksFacade.cartBooks$);
      expect(cartBooks.length).toBe(0);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('addBillingDetailsToStore() should add billing details to store', async done => {
    try {
      const billingData = { fname: 'a', lname: 'b' };

      booksFacade.addBillingDetailsToStore(billingData);
      const billingDetails = await readFirst(booksFacade.billingDetails$);
      expect(billingDetails).toBe(billingData);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('addPurchasingBooks() should add books to purchasing books array in store', async done => {
    try {
      const checkoutBooks = [{ id: 1 }, { id: 2 }];
      let purchasingBooks = await readFirst(booksFacade.purchasingBooks$);
      expect(purchasingBooks.length).toBe(0);

      booksFacade.addPurchasingBooks(checkoutBooks);
      purchasingBooks = await readFirst(booksFacade.purchasingBooks$);
      expect(purchasingBooks.length).toBe(2);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('itemsCount$ should give cartItems and mycollectionItems count', async done => {
    try {
      let itemCount = await readFirst(booksFacade.itemsCount$);
      const book = { id: 1 };
      const billingData = { fname: 'a', lname: 'b' };
      expect(itemCount.cartCount).toBe(0);
      expect(itemCount.myCollectionCount).toBe(0);

      booksFacade.addBookToCart(book);
      itemCount = await readFirst(booksFacade.itemsCount$);
      expect(itemCount.cartCount).toBe(1);
      expect(itemCount.myCollectionCount).toBe(0);

      booksFacade.addPurchasingBooks([book]);
      booksFacade.removeAllCartItems();
      booksFacade.addBillingDetailsToStore(billingData);
      itemCount = await readFirst(booksFacade.itemsCount$);
      expect(itemCount.cartCount).toBe(0);
      expect(itemCount.myCollectionCount).toBe(1);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
