import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Weekly } from './models/weekly.model';
import { Words } from './models/words.model';
import { FunFact } from './models/fun-fact.model';
import { Question } from './models/question.model';

@Injectable()
export class DataService {
  private words$: AngularFirestoreDocument<Words>;
  private funFacts$: AngularFirestoreDocument<{ facts: FunFact[] }>;
  private questions$: AngularFirestoreDocument<{ questions: Question[] }>;

  constructor(private db: AngularFirestore) {
    this.words$ = this.db.collection('app').doc<Words>('words');
    this.funFacts$ = this.db.collection('app').doc('fun-facts');
    this.questions$ = this.db.collection('app').doc('questions');
  }

  getWordOfTheWeek(): Observable<Weekly> {
    return this.words$.valueChanges().map((data: Words) => data.weekly);
  }

  getHistory(): Observable<Weekly[]> {
    return this.words$.valueChanges().map((data: Words) => data.history);
  }

  getFunFacts(): Observable<FunFact[]> {
    return this.funFacts$.valueChanges().map((data: { facts: FunFact[] }) => data.facts);
  }

  getQuestions(): Observable<Question[]> {
    return this.questions$.valueChanges().map((data: { questions: Question[] }) => data.questions);
  }

  updateWordOfWeek(word: string, meaning: string) {
    const wordsRef$ =
      this.db.firestore.collection('app').doc('words');

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
      this.db.firestore.collection('app').doc('words');

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
      this.db.firestore.collection('app').doc('words');

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

  updateFunFacts(title: string, description: string) {
    const factsRef$ =
      this.db.firestore.collection('app').doc('fun-facts');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(factsRef$).then(
        (factsData) => {
          let facts: FunFact[] = factsData.data().facts;
          let updatedFacts: { facts: FunFact[] } = {
            facts: facts && facts.length ?
              [{title: title, description: description}, ...facts] :
              [{title: title, description: description}]
          };
          transaction.update(factsRef$, JSON.parse(JSON.stringify(updatedFacts)));
        }
      );
    }));
  }

  updateQuestionsWithNewQuestion(question: string, username: string) {
    const questionsRef$ =
      this.db.firestore.collection('app').doc('questions');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(questionsRef$).then(
        (questionsData) => {
          let questions: Question[] = questionsData.data().questions;
          let updatedQuestions: { questions: Question[] } = {
            questions: questions && questions.length ?
              [{question: question, answer: '', username: username}, ...questions] :
              [{question: question, answer: '', username: username}]
          };
          transaction.update(questionsRef$, JSON.parse(JSON.stringify(updatedQuestions)));
        }
      );
    }));
  }

  updateQuestionsWithDeletedQuestion(question: string) {
    const questionsRef$ =
      this.db.firestore.collection('app').doc('questions');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(questionsRef$).then(
        (questionsData) => {
          let questions: Question[] = questionsData.data().questions;

          let updatedQuestions: { questions: Question[] } = {
            questions: [...questions.filter(q => q.question !== question)]
          };
          transaction.update(questionsRef$, JSON.parse(JSON.stringify(updatedQuestions)));
        }
      );
    }));
  }

  updateQuestionsWithAnsweredQuestion(question: Question) {
    const questionsRef$ =
      this.db.firestore.collection('app').doc('questions');

    return Observable.from(this.db.firestore.runTransaction((transaction) => {
      return transaction.get(questionsRef$).then(
        (questionsData) => {
          let questions: Question[] = questionsData.data().questions;

          let updatedQuestions: { questions: Question[] } = {
            questions: [question, ...questions.filter(q => q.question !== question.question)]
          };
          transaction.update(questionsRef$, JSON.parse(JSON.stringify(updatedQuestions)));
        }
      );
    }));
  }

}
