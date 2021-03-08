import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

const getBooksState = createFeatureSelector<fromApp.State>('books');

const getBooksLoaded = createSelector(
  getBooksState,
  state => {
    return state.booksLoaded;
  }
);

const getEffectsError = createSelector(
  getBooksState,
  state => {
    return state.effectsError;
  }
);

const getMyCollectionBooks = createSelector(
  getBooksState,
  state => {
    return state.mycollectionBooks;
  }
);

const getCartBooks = createSelector(
  getBooksState,
  state => {
    return Object.values(state.entities);
  }
);

const getItemsCount = createSelector(
  getMyCollectionBooks,
  getCartBooks,
  (mycollectionBooks, cartBooks) => {
    return {
      cartCount: cartBooks.length,
      myCollectionCount: mycollectionBooks.length
    };
  }
);

const getSearchString = createSelector(
  getBooksState,
  state => {
    return state.searchString;
  }
);

const getPurchasingBooks = createSelector(
  getBooksState,
  state => {
    return state.purchasingBooks;
  }
);
const getBillingDetails = createSelector(
  getBooksState,
  state => {
    return state.billingDetails;
  }
);
export const appSelectors = {
  getBooksLoaded,
  getMyCollectionBooks,
  getCartBooks,
  getItemsCount,
  getSearchString,
  getPurchasingBooks,
  getBillingDetails,
  getEffectsError
};
