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

  judgingScore(totalScore: { correct: number, incorrect: number }): { score: number, judgingMessage: number } {
    const { correct, incorrect } = totalScore;
    const totalQuestion = correct + incorrect;

    const scorePoint = Math.floor((correct / totalQuestion) * 5);

    return {
      score: scorePoint,
      judgingMessage: scorePoint
    }
  }

  loadJson() {
    return this.http.get<Judging[]>('assets/judging.json').subscribe({
      next: (res) => {
        this.judgementText = res;
      }
    });
  }

}
