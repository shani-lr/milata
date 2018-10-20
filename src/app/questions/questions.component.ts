import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Question } from '../models/question.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions = [];
  enableQuestionMode = false;
  question = '';
  isSuccess = false;
  isError = false;
  username = '';
  subscriptions = [];
  isAdmin = false;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getQuestions().subscribe(
        (questions: Question[]) =>
          this.questions = questions.filter(q => q.answer)
      )
    );

    this.subscriptions.push(
      this.authService.isAdmin().subscribe(
        isAdmin => this.isAdmin = isAdmin
      )
    );
  }

  onSendQuestion() {
    if (this.question) {
      this.spinner.show();
      this.subscriptions.push(
        this.dataService.updateQuestionsWithNewQuestion(this.question, this.username).subscribe(
          () => {
            this.isSuccess = true;
            this.isError = false;
            this.enableQuestionMode = false;
            this.question = '';
            this.username = '';
            this.spinner.hide();
          },
          () => {
            this.isSuccess = false;
            this.isError = true;
            this.spinner.hide();
          }
        ));
    } else {
      this.isSuccess = false;
      this.isError = true;
    }
  }

  onAnswerAgain(question: Question) {
    this.spinner.show();

    this.subscriptions.push(
      this.dataService.updateQuestionsWithDeletedQuestion(question.question).subscribe(
        () => {
          this.subscriptions.push(
            this.dataService.updateQuestionsWithNewQuestion(question.question, '').subscribe(
              () => {
                this.isSuccess = true;
                this.isError = false;
                this.enableQuestionMode = false;
                this.question = '';
                this.username = '';
                this.spinner.hide();
              },
              () => {
                this.isSuccess = false;
                this.isError = true;
                this.spinner.hide();
              }
            ))
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(x => x.unsubscribe());
  }
}
