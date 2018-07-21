import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnDestroy {

  word = '';
  meaning = '';
  hasPublished = false;
  private subscriptions$ = [];

  constructor(private dataService: DataService) {
  }

  onPublish() {
    this.subscriptions$.push(
      this.dataService.updateWordOfWeek(this.word, this.meaning).subscribe(() => {
          this.word = '';
          this.meaning = '';
          this.hasPublished = true;
        }
      ));
  }

  ngOnDestroy() {
    this.subscriptions$.map(sub => sub.unsubscribe());
  }
}
