import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  private app: AngularFirestoreDocument<{ weekly: string }>;

  constructor(private db: AngularFirestore) {
    this.app = this.db.collection('app').doc<{ weekly: string }>('words');
  }

  getWordOfTheWeek(): Observable<string> {
    return this.app.valueChanges().map((data: { weekly: string }) => data.weekly);
  }

  updateWordOfWeek(word: string): Observable<void> {
    return Observable.from(this.app.update({ weekly: word }));
  }

}
