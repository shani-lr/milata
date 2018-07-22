import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Weekly } from './weekly.model';
import { Words } from './words.model';

@Injectable()
export class DataService {
  private words$: AngularFirestoreDocument<Words>;

  constructor(private db: AngularFirestore) {
    this.words$ = this.db.collection('app').doc<Words>('words-test');
  }

  getWordOfTheWeek(): Observable<Weekly> {
    return this.words$.valueChanges().map((data: Words) => data.weekly);
  }

  getHistory(): Observable<Weekly[]> {
    return this.words$.valueChanges().map((data: Words) => data.history);
  }

  updateWordOfWeek(word: string, meaning: string) {
    const wordsRef$ =
      this.db.firestore.collection('app').doc('words-test');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(wordsRef$).then(
        (wordsData) => {
          let history: Weekly[] = wordsData.data().history;
          let weekly: Weekly = wordsData.data().weekly;
          let updatedApp: Words = {
            history: history && history.length ? [...history, weekly] : [weekly],
            weekly: {
              word: word,
              meaning: meaning,
              like: 0,
              dislike: 0
            }
          };

          transaction.update(wordsRef$, JSON.parse(JSON.stringify(updatedApp)));
        }
      );
    }));
  }

  updateWordOfWeekVotes(like: boolean) {
    const wordsRef$ =
      this.db.firestore.collection('app').doc('words-test');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(wordsRef$).then(
        (words) => {
          let weekly: Weekly = words.data().weekly;
          if (like) {
            weekly.like = weekly.like + 1;
          } else {
            weekly.dislike = weekly.dislike + 1;
          }

          transaction.update(wordsRef$, {weekly: weekly});
        }
      );
    }));
  }

  updateOldWordOfWeekVotes(weekly: Weekly, like: boolean) {
    const wordsRef$ =
      this.db.firestore.collection('app').doc('words-test');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(wordsRef$).then(
        (wordsData) => {
          let history: Weekly[] = wordsData.data().history;
          let index = history.findIndex(x => x.word === weekly.word);

          if (like) {
            history[index].like = history[index].like + 1;
          } else {
            history[index].dislike = history[index].dislike + 1;
          }

          transaction.update(wordsRef$, {history: history});
        }
      );
    }));
  }

}
