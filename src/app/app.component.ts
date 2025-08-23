import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageBoxComponent } from "./components/language-box/language-box.component";
import { Question, QuestionList } from './model/Question';
import { JudgingBoxComponent } from "./components/judging-box/judging-box.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { QuestionBoxComponent } from './components/question-box/question-box.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { QuestionService } from './service/question.service';
import { JudgingMessageService } from './service/judging-message.service';

export const MAX_QUESTION = 2;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageBoxComponent, QuestionBoxComponent, JudgingBoxComponent, TranslateModule, AppModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private questionService = inject(QuestionService);
  private translateService = inject(TranslateService);
  private judingMessage = inject(JudgingMessageService); // eager loading the component

  questionList : Question[] = [];
  prefLang: string = "";
  currentQuestion: number = 1;
  maximumQuestion: number = MAX_QUESTION;


  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }

  restartProgress() {
  }

  handleQuestionAnswerSelection(answer: string) {
    this.questionService.answerQuestion(this.questionList[this.currentQuestion - 1], answer)
    ++this.currentQuestion;
  }

  handlePreferedLanguageSelection(lang: string) {
    this.prefLang = lang;
    this.translateService.setDefaultLang(lang);
    this.loadQuestion();
  }

  get getQuestionMetadata() {
    return {
      questionNo: this.currentQuestion,
      totalQuestion: this.maximumQuestion
    }
  }

  private loadQuestion() {
    this.questionList = this.questionService.loadQuestion(this.maximumQuestion, this.prefLang);
  }

}
