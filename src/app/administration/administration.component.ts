import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Question } from '../models/question.model';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit, OnDestroy {

  currentWeekly: Weekly;
  word = '';
  meaning = '';
  options: {value: string}[] = [{value: ''}, {value: ''}, {value: ''}, {value: ''}];
  correctOption = null;
  title = '';
  description = '';
  answer = '';
  questions = [];
  hasPublished = false;

  answerIndex = -1;
  private subscriptions$ = [];

  constructor(private dataService: DataService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.subscriptions$.push(
      this.dataService.getQuestions().subscribe(
        questions => this.questions = questions.filter(q => !q.answer)
      )
    );
    this.subscriptions$.push(
      this.dataService.getWordOfTheWeek().subscribe(
        (currentWord: Weekly) => this.currentWeekly = currentWord
      )
    );
  }

  onPublishWorkOfWeek() {
    this.spinner.show();
    this.subscriptions$.push(
      this.dataService.updateWordOfWeek(this.word, this.meaning, this.options.map(x => x.value), this.correctOption).subscribe(() => {
          this.word = '';
          this.meaning = '';
          this.options = [{value: ''}, {value: ''}, {value: ''}, {value: ''}];
          this.correctOption = null;
          this.hasPublished = true;
          this.spinner.hide();
        }
      ));
  }

  onPublishFact() {
    this.spinner.show();
    this.subscriptions$.push(
      this.dataService.updateFunFacts(this.title, this.description).subscribe(() => {
          this.title = '';
          this.description = '';
          this.hasPublished = true;
          this.spinner.hide();
        }
      ));
  }

  onDelete(question: Question) {
    this.spinner.show();
    this.subscriptions$.push(
      this.dataService.updateQuestionsWithDeletedQuestion(question.question).subscribe(() => {
        this.hasPublished = true;
        this.spinner.hide();
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions$.map(sub => sub.unsubscribe());
  }

  onAnswer(question) {
    this.spinner.show();
    this.subscriptions$.push(
      this.dataService.updateQuestionsWithAnsweredQuestion(question).subscribe(
        () => {
          this.spinner.hide();
          this.hasPublished = true;
          this.answerIndex = -1;
        }
      )
    )
  }
}

import { Weekly } from '../models/weekly';
