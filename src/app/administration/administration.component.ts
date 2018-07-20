import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  word = '';
  meaning = '';
  hasPublished = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  onPublish() {
    this.dataService.updateWordOfWeek(this.word, this.meaning).subscribe(() => {
        this.word = '';
        this.meaning = '';
        this.hasPublished = true;
      }
    );
  }
}
