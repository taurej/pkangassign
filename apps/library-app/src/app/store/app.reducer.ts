import * as appActions from './app.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<any> {
  booksLoaded: any[];
  cartBooks: any[];
  purchasingBooks: any[];
  mycollectionBooks: any[];
  billingDetails: any;
  searchString: string;
  effectsError: string;
}
const adapter: EntityAdapter<State> = createEntityAdapter<State>();
const initBooks: State = adapter.getInitialState({
  booksLoaded: [],
  cartBooks: [],
  purchasingBooks: [],
  mycollectionBooks: [],
  billingDetails: {},
  searchString: '',
  effectsError: null
});

export function appReducer(state = initBooks, action: appActions.appActions) {
  switch (action.type) {
    case appActions.BOOKS_LOADED: {
      return {
        ...state,
        booksLoaded: action.payload.booksLoaded
      };
    }
    case appActions.SET_EFFECTS_ERROR: {
      return {
        ...state,
        effectsError: action.payload.error
      };
    }
    case appActions.CLEAR_EFFECTS_ERROR: {
      return {
        ...state,
        effectsError: null
      };
    }
    case appActions.STORE_SEARCH_STRING: {
      return {
        ...state,
        searchString: action.payload.searchString
      };
    }
    case appActions.ADD_TO_CART: {
      return adapter.addOne(action.payload.book, state);
    }
    case appActions.PURCHASE_BOOKS: {
      return {
        ...state,
        purchasingBooks: action.payload.purchasingBooks
      };
    }
    case appActions.REMOVE_CART_ITEM: {
      return adapter.removeOne(action.payload.id, state);
    }
    case appActions.REMOVE_ALL_CART_ITEMS: {
      return adapter.removeAll(state);
    }
    case appActions.BILLING_SUCCESS: {
      return {
        ...state,
        billingDetails: action.payload.billingData,
        mycollectionBooks: [
          ...state.mycollectionBooks,
          ...state.purchasingBooks
        ]
      };
    }
    default:
      return state;
  }
}

export const { selectEntities, selectAll } = adapter.getSelectors();
