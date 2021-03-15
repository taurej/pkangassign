import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import {  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {  MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../shared/services/shared/shared.service';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import { BooksFacade } from '../../store/app.facade';
import * as fromApp from '../../store/app.reducer';
describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let service: SharedService;
  let booksFacade: BooksFacade;
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
        SharedService,
        BooksFacade
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        StoreModule.forRoot({ books: fromApp.appReducer }),
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
  it('should call sharedService buyNow method on click of component buyNow method', () => {
    const book = { id: 1 };
    service = TestBed.inject(SharedService);
    const spy = spyOn(service, 'buyNow');
    component.buyNow(book);
    expect(spy).toHaveBeenCalledWith(book);
  });
  it('should call sharedService onAddToCart method on click of component onAddToCart method', () => {
    const book = { id: 1 };
    service = TestBed.inject(SharedService);
    const spy = spyOn(service, 'addToCart');
    component.addToCart(book);
    expect(spy).toHaveBeenCalledWith(book);
  });
});
