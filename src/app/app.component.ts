import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ברוך הבא למילאתא!';

  constructor(private angularFirestore: AngularFirestore,
              private fb: FacebookService) {
    const firestore = this.angularFirestore.firestore.settings({timestampsInSnapshots: true});
    let initParams: InitParams = {
      version: 'v3.1',
      xfbml: true
    };
    this.fb.init(initParams);
  }
}
