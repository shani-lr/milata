import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HistoryItem } from '../models/history-item.model';
import { DataService } from '../data.service';
import { Weekly } from '../models/weekly';

@ Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() isHistoryMode: boolean;
  @Input() oldWeekly: HistoryItem;

  weekly: HistoryItem;
  results: number[] = [];
  labels: string[] = ['אימצתי!', 'לא אשתמש אבל אתה מלך'];
  colors = [{ backgroundColor: ['#2C83C9', '#FAC51D']}];
  private subscriptions = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (!this.isHistoryMode) {
      this.subscriptions.push(
        this.dataService.getWordOfTheWeek().subscribe((weekly: HistoryItem) => {
          this.weekly = weekly;
          if (this.weekly) {
            this.results = [ this.weekly.like, this.weekly.dislike ]
          }
        })
      );
    } else {
      this.weekly = this.oldWeekly;
      this.results = [ this.weekly.like, this.weekly.dislike ]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.oldWeekly && changes.oldWeekly.currentValue) {
      this.weekly = this.oldWeekly;
      this.results = [ this.weekly.like, this.weekly.dislike ]
    }
  }

}
