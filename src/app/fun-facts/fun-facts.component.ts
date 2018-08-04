import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FunFact } from '../fun-fact.model';

@Component({
  selector: 'app-fun-facts',
  templateUrl: './fun-facts.component.html',
  styleUrls: ['./fun-facts.component.css']
})
export class FunFactsComponent implements OnInit {

  funFacts: FunFact[];
  private subscriptions = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getFunFacts().subscribe(
        (facts: FunFact[]) => {
          this.funFacts = facts;
        }
      ));
  }

}
