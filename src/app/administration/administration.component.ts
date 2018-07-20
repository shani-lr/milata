import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  word = '';
  hasPublished = false;

  constructor(private dataServie: DataService) {
  }

  ngOnInit() {
  }

  onPublish() {
    this.dataServie.updateWordOfWeek(this.word).subscribe(() => {
        this.word = '';
        this.hasPublished = true;
      }
    );
  }
}
