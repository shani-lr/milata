import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnDestroy {

  word = '';
  meaning = '';
  title = '';
  description = '';
  hasPublished = false;
  private subscriptions$ = [];

  constructor(private dataService: DataService,
              private spinner: NgxSpinnerService) {
  }

  onPublish() {
    this.spinner.show();
    this.subscriptions$.push(
      this.dataService.updateWordOfWeek(this.word, this.meaning).subscribe(() => {
          this.word = '';
          this.meaning = '';
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

  ngOnDestroy() {
    this.subscriptions$.map(sub => sub.unsubscribe());
  }
}
