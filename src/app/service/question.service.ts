import { inject, Injectable } from '@angular/core';
import { Question, QuestionList } from '../model/Question';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  correctScore$ = new BehaviorSubject<number>(0);
  wrongScore$ = new BehaviorSubject<number>(0);

  private questionList: QuestionList[] = [];
  private http = inject(HttpClient);

  constructor() {
    this.loadJson();
   }

   public answerQuestion(question: Question, answer: string) : string {
    if (question.answer === answer) {
      this.correctScore$.next(this.correctScore$.value + 1);
    } else {
      this.wrongScore$.next(this.wrongScore$.value + 1);
    }
      return question.fact ?? '';
   }

   public resetQuestion() {
    this.wrongScore$.next(0);
    this.correctScore$.next(0);
   }

   public get getCurrentScore() {
    return this.correctScore$.value;
   }

   public get getWrongScore() {
    return this.wrongScore$.value;
   }

   public loadJson() {
    this.http.get<QuestionList[]>('assets/question.json').subscribe({
      next: (res) => {
        this.questionList = res;
      }
    });
   }
}
