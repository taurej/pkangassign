import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule
} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../shared/services/shared/shared.service';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let service: SharedService;

  beforeEach(async(() => {
    @NgModule({
      declarations: [AlertDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      entryComponents: [AlertDialogComponent]
    })
    class TestModule {}

    TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        SharedService
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        StoreModule.forRoot([]),
        BrowserAnimationsModule,
        MatDialogModule,
        TestModule
      ]
    }).compileComponents();
    TestBed.inject(SharedService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
