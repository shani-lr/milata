import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Weekly } from '../weekly.model';
import { DataService } from '../data.service';

@ Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() isHistoryMode: boolean;
  @Input() oldWeekly: Weekly;

  weekly: Weekly;
  results: { name: string; value: number }[] = [];
  private subscriptions = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (!this.isHistoryMode) {
      this.subscriptions.push(
        this.dataService.getWordOfTheWeek().subscribe((weekly: Weekly) => {
          this.weekly = weekly;
          if (this.weekly) {
            this.results = [{ name: 'אימצתי!', value: this.weekly.like}, { name: 'לא אשתמש אבל אתה מלך', value: this.weekly.dislike }]
          }
        })
      );
    } else {
      this.weekly = this.oldWeekly;
      this.results = [{ name: 'אימצתי!', value: this.weekly.like}, { name: 'לא אשתמש אבל אתה מלך', value: this.weekly.dislike }];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.oldWeekly && changes.oldWeekly.currentValue) {
      this.weekly = this.oldWeekly;
      this.results = [{ name: 'אימצתי!', value: this.weekly.like}, { name: 'לא אשתמש אבל אתה מלך', value: this.weekly.dislike }];
    }
  }

}
