import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ברוך הבא למילאתא!';

  constructor(private angularFirestore: AngularFirestore) {
    const firestore = this.angularFirestore.firestore.settings({timestampsInSnapshots: true});
  }
}
