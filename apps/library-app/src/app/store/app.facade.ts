import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import { appSelectors } from './app.selectors';
import * as appActions from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class BooksFacade {
  //list of selectors
  booksLoaded$ = this.store.select(appSelectors.getBooksLoaded);
  booksLoadedError$ = this.store.select(appSelectors.getEffectsError);
  cartBooks$ = this.store.select(appSelectors.getCartBooks);
  myCollectionBooks$ = this.store.select(appSelectors.getMyCollectionBooks);
  itemsCount$ = this.store.select(appSelectors.getItemsCount);
  searchString$ = this.store.select(appSelectors.getSearchString);
  purchasingBooks$ = this.store.select(appSelectors.getPurchasingBooks);
  billingDetails$ = this.store.select(appSelectors.getBillingDetails);

  constructor(private store: Store<fromApp.State>) {}

  //methods for dispatching actions
  removeAllCartItems() {
    this.store.dispatch(new appActions.RemoveAllCartItems());
  }
  addBillingDetailsToStore(billingDetails) {
    this.store.dispatch(
      new appActions.BillingSuccess({ billingData: billingDetails })
    );
  }
  addPurchasingBooks(cartItems) {
    this.store.dispatch(
      new appActions.PurchaseBooks({ purchasingBooks: cartItems })
    );
  }
  addBookToCart(book) {
    this.store.dispatch(new appActions.AddToCart({ book: book }));
  }
  removeCartItem(book) {
    this.store.dispatch(new appActions.RemoveCartItem({ id: book.id }));
  }
  storeSearchStringInStore(searchString) {
    this.store.dispatch(
      new appActions.StoreSearchString({ searchString: searchString })
    );
  }
  storeSearchBooks(booksData) {
    return new appActions.BooksLoaded({ booksLoaded: booksData.items || [] });
  }
  loadSearchBooks(searchString) {
    this.store.dispatch(
      new appActions.GetBooks({ searchString: searchString })
    );
  }
  SetEffectsError(error) {
    return new appActions.SetEffectsError({ error: error });
  }
  ClearEffectsError() {
    this.store.dispatch(new appActions.ClearEffectsError());
  }
}
