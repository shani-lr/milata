import { Component, OnInit } from '@angular/core';
import { Weekly } from '../weekly.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  weekly: Weekly;
  results: { name: string; value: number }[] = [];
  private subscriptions = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getWordOfTheWeek().subscribe((weekly: Weekly) => {
        this.weekly = weekly;
        if (this.weekly) {
          this.results = [{ name: 'אימצתי!', value: this.weekly.like}, { name: 'לא אשתמש אבל אתה מלך', value: this.weekly.dislike }]
        }
      })
    );
  }


}
