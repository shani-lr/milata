import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Weekly } from '../weekly.model';

@Component({
  selector: 'app-word-of-week',
  templateUrl: './word-of-week.component.html',
  styleUrls: ['./word-of-week.component.css']
})
export class WordOfWeekComponent implements OnInit {
  private weekly$: Observable<Weekly>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.weekly$ = this.dataService.getWordOfTheWeek();
  }

}
