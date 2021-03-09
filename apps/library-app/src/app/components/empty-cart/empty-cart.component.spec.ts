import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyCartComponent } from './empty-cart.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MyCollectionComponent } from '../mycollection/mycollection.component';
import { BillingComponent } from '../billing/billing.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { CartComponent } from '../cart/cart.component';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('EmptyCartComponent', () => {
  let component: EmptyCartComponent;
  let fixture: ComponentFixture<EmptyCartComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmptyCartComponent,
        DashboardComponent,
        MyCollectionComponent,
        BillingComponent,
        BookDetailComponent,
        CartComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      imports: [RouterTestingModule.withRoutes(appRoutes), FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to Dashboard page', () => {
    const spy = spyOn(router, 'navigate');
    component.goToDashboard();
    expect(spy).toHaveBeenCalledWith(['dashboard']);
  });
});
