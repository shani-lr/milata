import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Weekly } from '../weekly.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-word-of-week',
  templateUrl: './word-of-week.component.html',
  styleUrls: ['./word-of-week.component.css']
})
export class WordOfWeekComponent implements OnInit, OnDestroy {
  weekly: Weekly;
  hasVoted = false;
  results = [];
  private subscriptions = [];

  constructor(private dataService: DataService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getWordOfTheWeek().subscribe((weekly: Weekly) => {
        this.weekly = weekly;
        if (this.weekly) {
          this.results = [{ name: 'שימושי', value: this.weekly.like}, { name: 'מיותר', value: this.weekly.dislike }]
        }
      })
    );
  }

  vote(like: boolean) {
    this.spinner.show();
    this.subscriptions.push(
      this.dataService.updateWordOfWeekVotes(like).subscribe(() => {
        this.hasVoted = true;
        this.spinner.hide();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
