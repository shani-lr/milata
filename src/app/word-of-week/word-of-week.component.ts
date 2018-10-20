import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Weekly } from '../models/weekly.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-word-of-week',
  templateUrl: './word-of-week.component.html',
  styleUrls: ['./word-of-week.component.css']
})
export class WordOfWeekComponent implements OnInit, OnDestroy  {
  @Input() isHistoryMode: boolean;
  @Input() oldWeeklyIndex: number;
  @Input() showResults: boolean;

  weekly: Weekly;
  hasVoted = false;
  private subscriptions = [];

  constructor(private dataService: DataService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    if (!this.isHistoryMode) {
      this.subscriptions.push(
        this.dataService.getWordOfTheWeek().subscribe((weekly: Weekly) => {
          this.weekly = weekly;
          this.spinner.hide();
        })
      );
    } else {
      this.subscriptions.push(
        this.dataService.getHistory().subscribe((history: Weekly[]) => {
          this.weekly = history[this.oldWeeklyIndex];
          this.spinner.hide();
        })
      );
    }
  }

  vote(like: boolean) {
    this.spinner.show();

    if (!this.isHistoryMode) {
      this.subscriptions.push(
        this.dataService.updateWordOfWeekVotes(like).subscribe(() => {
          this.hasVoted = true;
          this.spinner.hide();
        })
      );
    } else {
      this.subscriptions.push(
        this.dataService.updateOldWordOfWeekVotes(this.weekly, like).subscribe(() => {
          this.hasVoted = true;
          this.spinner.hide();
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
