import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() books:Product; 
  @Input() page:string; 
  @Output() bookData  = new EventEmitter();
  constructor(    
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  bookDetails(book) {
    this.router.navigate(['/bookDetail',book.id]);
  }
  removeCartItem(book){
    this.bookData.emit(book);
  }

}
