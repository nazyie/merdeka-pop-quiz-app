import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageBoxComponent } from "./components/language-box/language-box.component";
import { QuestionBoxComponent } from "./question-box/question-box.component";
import { Question } from './model/Question';
import { myQuiz } from './question/my';
import { JudgingBoxComponent } from "./components/judging-box/judging-box.component";
import { enQuiz } from './question/en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageBoxComponent, QuestionBoxComponent, JudgingBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  myQuestion : Question [] = myQuiz;
  enQuestion : Question [] = enQuiz;

  questions : Question [] = this.myQuestion;

  score: number;
  totalQuestion: number;
  wrongScore: number;
  pageNumber : number;
  lang: string;

  constructor() {
    this.totalQuestion = this.questions.length;
    this.wrongScore = 0;
    this.pageNumber = 0;
    this.score = 0;
    this.lang = "";
  }

  restartProgress() {
    this.totalQuestion = this.questions.length;
    this.wrongScore = 0;
    this.pageNumber = 0;
    this.score = 0;
    this.lang = "";
  }

  handleEventPageNumber(pageNumber: number) {
    this.pageNumber += pageNumber;
  }

  handleEventScore(score: number) {
    if (score == 1)
      this.score += 1;

    if (score == 0)
      this.wrongScore += 1;

    this.handleEventPageNumber(1);
  }

  handleEventChooseLang(event : string) {
    ++this.pageNumber;
    this.lang = event;

    if (this.lang === 'my')
      this.questions = this.myQuestion;

    if (this.lang === 'en')
      this.questions = this.enQuestion;
  }

}
