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

  public answerQuestion(question: Question, answer: string): string {
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

  public loadQuestion(noOfQuestion: number, prefLang: string): Question[] {
    const selected = this.questionList.find(item => item.lang === prefLang);

    if (!selected) return [];

    const shuffled = [...selected.questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, noOfQuestion);
  }

  get getCurrentScore() {
    return this.correctScore$.value;
  }

  get getWrongScore() {
    return this.wrongScore$.value;
  }

  get getOverallScore() : { correct: number, incorrect: number } {
    return {
      correct: this.correctScore$.value,
      incorrect: this.wrongScore$.value
    }
  }

  public loadJson() {
    this.http.get<QuestionList[]>('assets/question.json').subscribe({
      next: (res) => {
        this.questionList = res;
      }
    });
  }
}
