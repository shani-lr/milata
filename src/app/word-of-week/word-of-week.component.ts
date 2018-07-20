import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-word-of-week',
  templateUrl: './word-of-week.component.html',
  styleUrls: ['./word-of-week.component.css']
})
export class WordOfWeekComponent implements OnInit {
  private word$: Observable<string>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.word$ = this.dataService.getWordOfTheWeek();
  }

}
