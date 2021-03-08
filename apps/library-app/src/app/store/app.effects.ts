import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from './app.actions';
import { BooksFacade } from './app.facade';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private booksFacade: BooksFacade
  ) {}

  @Effect()
  getBooks$ = this.actions$.pipe(
    ofType(appActions.GET_BOOKS),
    switchMap((actionData: appActions.GetBooks) => {
      return this.http
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=' +
            actionData.payload.searchString
        )
        .pipe(
          map((booksData: any) => {
            return this.booksFacade.storeSearchBooks(booksData);
          }),
          catchError((error: any) => {
            return of(
              this.booksFacade.SetEffectsError(
                'Loading books failed. try again.'
              )
            );
          })
        );
    })
  );
}
