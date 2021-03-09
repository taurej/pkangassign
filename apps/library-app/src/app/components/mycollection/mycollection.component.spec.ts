import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionComponent } from './mycollection.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../../shared/services/shared/shared.service';
import * as fromApp from '../../store/app.reducer';

describe('MyCollectionComponent', () => {
  let component: MyCollectionComponent;
  let fixture: ComponentFixture<MyCollectionComponent>;
  let service: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyCollectionComponent],
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
        StoreModule.forRoot({ books: fromApp.appReducer }),
        BrowserAnimationsModule,
        MatDialogModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to Dashboard page', () => {
    const router: Router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.goToDashboard();
    expect(spy).toHaveBeenCalledWith(['dashboard']);
  });
  it('should set selected Book in sharedService on click of onBookDetails(book) and navigate to book details page', () => {
    const book = { id: 1 };
    const router: Router = TestBed.inject(Router);
    service = TestBed.inject(SharedService);
    const spy = spyOn(router, 'navigate');
    component.onBookDetails(book);
    const bookData = service.getBookDetail();
    expect(spy).toHaveBeenCalledWith(['/bookDetail']);
    expect(bookData).toBe(book);
  });
});
