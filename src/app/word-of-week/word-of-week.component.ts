import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { HistoryItem } from '../models/history-item.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Weekly } from '../models/weekly';

@Component({
  selector: 'app-word-of-week',
  templateUrl: './word-of-week.component.html',
  styleUrls: ['./word-of-week.component.css']
})
export class WordOfWeekComponent implements OnInit, OnDestroy {
  @Input() isHistoryMode: boolean;
  @Input() oldWeeklyIndex: number;
  @Input() showResults: boolean;

  weekly: Weekly;
  hasVoted = false;
  showOptionsButtons = true;
  showMeaning = false;
  showOptions = false;
  hasSelectedOption = false;
  isCorrect = false;
  selectedOption = '';
  private subscriptions = [];

  constructor(private dataService: DataService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    if (!this.isHistoryMode) {
      this.subscriptions.push(
        this.dataService.getWordOfTheWeek().subscribe((weekly: Weekly) => {
          this.weekly = weekly;
          this.selectedOption = this.weekly.options[0];
          this.spinner.hide();
        })
      );
    } else {
      this.subscriptions.push(
        this.dataService.getHistory().subscribe((history: HistoryItem[]) => {
          this.weekly = {
            ...history[this.oldWeeklyIndex],
            options: [],
            correctOption: '',
            wrongGuesses: 0,
            correctGuesses: 0
          };
          this.spinner.hide();
        })
      );
    }
  }

  vote(like: boolean) {
    this.spinner.show();
    this.hasSelectedOption = false;

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

  chooseOption() {
    this.spinner.show();
    this.isCorrect = this.selectedOption === this.weekly.correctOption;
    this.subscriptions.push(
      this.dataService.updateWordOfWeekGuesses(this.isCorrect).subscribe(() => {
          this.showOptions = false;
          this.showMeaning = true;
          this.hasSelectedOption = true;
          this.spinner.hide();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
