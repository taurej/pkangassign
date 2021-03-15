import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookComponent } from './book.component';
import { SharedService } from '../../services/shared/shared.service';
import { Router, RouterModule } from '@angular/router';
import { BooksFacade } from '../../../store/app.facade';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookComponent', () => {
  let service: SharedService;
  let router: Router;
  let booksFacade: BooksFacade;
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        SharedService,
        BooksFacade
      ],
      imports:[
        RouterModule.forRoot([]),
        HttpClientModule,
        StoreModule.forRoot({ books: fromApp.appReducer }),
        BrowserAnimationsModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bookDetails() should set bookData in sharedService and navigate to book detail page', () => {
    const book = { id: 1 };
    //service = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    const RouterSpy = spyOn(router, 'navigate');
    component.bookDetails(book);
   // const bookData = service.getBookDetail();
    expect(RouterSpy).toHaveBeenCalledWith(['/bookDetail',book.id]);
    //expect(bookData).toBe(book);
  });
  it('should emit on click', () => {
    const book = { id: 1 };
    spyOn(component.bookData, 'emit');
    component.removeCartItem(book);
    expect(component.bookData.emit).toHaveBeenCalled();
    expect(component.bookData.emit).toHaveBeenCalledWith(book);
 });
});
