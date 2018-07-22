import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Weekly } from '../weekly.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  history: Weekly[];
  weeklySelected = false;
  showResults = false;
  selectedWeeklyIndex: number;
  private subscriptions = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getHistory().subscribe((history: Weekly[]) => {
        this.history = history;
      }));
  }

  onSelectWeekly(index: number) {
    this.selectedWeeklyIndex = index;
    this.weeklySelected = true;
  }

  onBack() {
    this.weeklySelected = false;
    this.showResults = false;
  }

  onShowResults() {
    this.showResults = true;
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
