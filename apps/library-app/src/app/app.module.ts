import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { CartComponent } from './components/cart/cart.component';
import { MyCollectionComponent } from './components/mycollection/mycollection.component';
import { BillingComponent } from './components/billing/billing.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RatingComponent } from './shared/components/rating/rating.component';
import { A11yModule } from '@angular/cdk/a11y';
import * as fromApp from './store/app.reducer';
import { AppEffects } from './store/app.effects';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { MaterialModule } from './material.module';
import { BookComponent } from './shared/components/book/book.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    CartComponent,
    MyCollectionComponent,
    BillingComponent,
    BookDetailComponent,
    RatingComponent,
    EmptyCartComponent,
    AlertDialogComponent,
    LoadingComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    A11yModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    StoreModule.forRoot({ books: fromApp.appReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  entryComponents: [AlertDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
