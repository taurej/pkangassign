import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedService } from '../../shared/services/shared/shared.service';
import { BooksFacade } from '../../store/app.facade';
import { readFirst } from '@nrwl/angular/testing';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: SharedService;
  let router: Router;
  let booksFacade: BooksFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        SharedService,
        BooksFacade
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onSearchBooks() should store search string in store and load the books from service', async () => {
    service = TestBed.inject(SharedService);
    booksFacade = TestBed.inject(BooksFacade);
    const searchTerm = 'nodejs';
    component.onSearchBooks(searchTerm);
    const searchString = await readFirst(booksFacade.searchString$);
    expect(searchString).toBe(searchTerm);
  });
  it('onSearchBooks() should not store empty search string in store', async () => {
    service = TestBed.inject(SharedService);
    booksFacade = TestBed.inject(BooksFacade);
    const searchTerm = '';
    component.onSearchBooks(searchTerm);
    const searchString = await readFirst(booksFacade.searchString$);
    expect(searchString).toBe(searchTerm);
  });
  it('should call sharedService onBuyNow method on click of component onBuyNow method', () => {
    const book = { id: 1 };
    service = TestBed.inject(SharedService);
    const spy = spyOn(service, 'onBuyNow');
    component.onBuyNow(book);
    expect(spy).toHaveBeenCalledWith(book);
  });
  it('should call sharedService onAddToCart method on click of component onAddToCart method', () => {
    const book = { id: 1 };
    service = TestBed.inject(SharedService);
    const spy = spyOn(service, 'onAddToCart');
    component.onAddToCart(book);
    expect(spy).toHaveBeenCalledWith(book);
  });
  it('onBookDetails() should set bookData in sharedService and navigate to book detail page', () => {
    const book = { id: 1 };
    service = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    const RouterSpy = spyOn(router, 'navigate');

    component.onBookDetails(book);

    const bookData = service.getBookDetail();

    expect(RouterSpy).toHaveBeenCalledWith(['/bookdetail']);
    expect(bookData).toBe(book);
  });
});
