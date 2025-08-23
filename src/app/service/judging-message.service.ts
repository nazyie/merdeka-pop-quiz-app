import { inject, Injectable } from '@angular/core';
import { Judging } from '../model/Judging';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JudgingMessageService {
  judgementText!: Judging[];

  private http = inject(HttpClient);

  constructor() {
    this.loadJson();
  }

  judgementResultByScore(totalScore: { correct: number, incorrect: number }, prefLang: string): { score: number, judgingMessage: Judging | undefined } {
    const { correct, incorrect } = totalScore;
    const totalQuestion = correct + incorrect;

    const scorePoint = Math.floor((correct / totalQuestion) * 5);
    const judgingResult = this.judgementText.find((item) => {
      return item.score === scorePoint && item.lang === prefLang
    });

    return {
      score: scorePoint,
      judgingMessage: judgingResult
    }
  }

  loadJson() {
    this.http.get<Judging[]>('assets/judging.json').subscribe({
      next: (res) => {
        this.judgementText = res;
      }
    });
  }

}
