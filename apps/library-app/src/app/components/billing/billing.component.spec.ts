import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingComponent } from './billing.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { BooksFacade } from '../../store/app.facade';
import { readFirst } from '@nrwl/angular/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let booksFacade: BooksFacade;

  beforeEach(async(() => {
    @NgModule({
      declarations: [AlertDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      entryComponents: [AlertDialogComponent]
    })
    class TestModule {}
    TestBed.configureTestingModule({
      declarations: [BillingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        HttpClientModule,
        TestModule,
        BrowserAnimationsModule,
        MatDialogModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({ books: fromApp.appReducer })
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        BooksFacade
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to Dashboard page', () => {
    const router: Router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.navToDashboard();
    expect(spy).toHaveBeenCalledWith(['myCollection']);
  });
  it('onBillingSubmit() should set billing details in store and clear all cart if come from cart page', async () => {
    booksFacade = TestBed.inject(BooksFacade);
    const billingDetails = {
      fname: 'fName',
      address: 'gkp hno',
      mobile: '123456789',
      email: 'asd@gmail.com'
    };
    const book = { id: 1 };
    booksFacade.addBookToCart(book);
    let cartItems = await readFirst(booksFacade.cartBooks$);
    expect(cartItems.length).toBe(1);

    component.checkout = 'true';
    component.billingDetails = billingDetails;
    component.onBillingSubmit();

    const billingData = await readFirst(booksFacade.billingDetails$);
    cartItems = await readFirst(booksFacade.cartBooks$);
    expect(billingData).toBe(billingDetails);
    expect(cartItems.length).toBe(0);
  });
  it('onBillingSubmit() should set billing details in store and not clear cart if come from dashboard page', async () => {
    booksFacade = TestBed.inject(BooksFacade);
    const billingDetails = {
      fname: 'fName',
      address: 'GKP hno',
      mobile: '123456789',
      email: 'asd@gmail.com'
    };
    const book = { id: 1 };
    booksFacade.addBookToCart(book);
    let cartItems = await readFirst(booksFacade.cartBooks$);
    expect(cartItems.length).toBe(1);

    component.checkout = 'false';
    component.billingDetails = billingDetails;
    component.onBillingSubmit();

    const billingData = await readFirst(booksFacade.billingDetails$);
    cartItems = await readFirst(booksFacade.cartBooks$);
    expect(billingData).toBe(billingDetails);
    expect(cartItems.length).toBe(1);
  });
});
