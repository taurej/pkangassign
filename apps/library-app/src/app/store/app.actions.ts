import { Action } from '@ngrx/store';
import { BillingData } from '../components/billing/billing.component';

export const GET_BOOKS = 'GET_BOOKS';
export const SET_EFFECTS_ERROR = 'SET_EFFECTS_ERROR';
export const CLEAR_EFFECTS_ERROR = 'CLEAR_EFFECTS_ERROR';
export const BOOKS_LOADED = 'BOOKS_LOADED';
export const STORE_SEARCH_STRING = 'STORE_SEARCH_STRING';
export const ADD_TO_CART = 'ADD_TO_CART';
export const PURCHASE_BOOKS = 'PURCHASE_BOOKS';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const BILLING_SUCCESS = 'BILLING_SUCCESS';
export const REMOVE_ALL_CART_ITEMS = 'REMOVE_ALL_CART_ITEMS';

//create Action
export class GetBooks implements Action {
  readonly type = GET_BOOKS;
  constructor(public payload: { searchString: string }) {}
}
/* istanbul ignore next */
export class SetEffectsError implements Action {
  readonly type = SET_EFFECTS_ERROR;
  constructor(public payload: { error: string }) {}
}
/* istanbul ignore next */
export class ClearEffectsError implements Action {
  readonly type = CLEAR_EFFECTS_ERROR;
}
export class BooksLoaded implements Action {
  readonly type = BOOKS_LOADED;
  constructor(public payload: { booksLoaded: any[] }) {}
}

export class StoreSearchString implements Action {
  readonly type = STORE_SEARCH_STRING;
  constructor(public payload: { searchString: string }) {}
}

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
  constructor(public payload: { book: any }) {}
}

export class PurchaseBooks implements Action {
  readonly type = PURCHASE_BOOKS;
  constructor(public payload: { purchasingBooks: any[] }) {}
}

export class RemoveCartItem implements Action {
  readonly type = REMOVE_CART_ITEM;
  constructor(public payload: { id: string }) {}
}

export class RemoveAllCartItems implements Action {
  readonly type = REMOVE_ALL_CART_ITEMS;
}

export class BillingSuccess implements Action {
  readonly type = BILLING_SUCCESS;
  constructor(public payload: { billingData: BillingData }) {}
}
export type appActions =
  | GetBooks
  | SetEffectsError
  | ClearEffectsError
  | BooksLoaded
  | StoreSearchString
  | AddToCart
  | RemoveCartItem
  | RemoveAllCartItems
  | BillingSuccess
  | PurchaseBooks;
