import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Weekly } from './weekly.model';

@Injectable()
export class DataService {
  private app: AngularFirestoreDocument<{ weekly: Weekly }>;

  constructor(private db: AngularFirestore) {
    this.app = this.db.collection('app').doc<{ weekly: Weekly }>('words');
  }

  getWordOfTheWeek(): Observable<Weekly> {
    return this.app.valueChanges().map((data: { weekly: Weekly }) => data.weekly);
  }

  updateWordOfWeek(word: string, meaning: string): Observable<void> {
    return Observable.from(this.app.update({
        weekly: {
          word: word,
          meaning: meaning,
          like: 0,
          dislike: 0
        }
      }
    ));
  }

  updateWordOfWeekVotes(like: boolean) {
    const appRef = this.db.firestore.collection('app').doc('words');
    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(appRef).then(
        (app) => {
          let weekly: Weekly = app.data().weekly;
          if (like) {
            weekly.like = weekly.like + 1;
          } else {
            weekly.dislike = weekly.dislike + 1;
          }

          transaction.update(appRef, {weekly: weekly});
        }
      );
    }));
  }

}
