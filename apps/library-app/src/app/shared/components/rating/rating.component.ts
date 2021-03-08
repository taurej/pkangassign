import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'enlight-star-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  constructor() {}

  @Input() rating: any;
  finalStars: any = [];

  ngOnInit() {
    this.rating = Number(this.rating);
    this.finalStars = [
      'star_border',
      'star_border',
      'star_border',
      'star_border',
      'star_border'
    ];
    if (isNaN(this.rating) === false) {
      this.finalStars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= this.rating) {
          this.finalStars.push('star');
        } else if (i - this.rating < 1) {
          this.finalStars.push('star_half');
        } else {
          this.finalStars.push('star_border');
        }
      }
    }
  }
}
