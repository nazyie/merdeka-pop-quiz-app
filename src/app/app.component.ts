import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageBoxComponent } from "./components/language-box/language-box.component";
import { Question } from './model/Question';
import { JudgingBoxComponent } from "./components/judging-box/judging-box.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { QuestionBoxComponent } from './components/question-box/question-box.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { QuestionService } from './service/question.service';
import { JudgingMessageService } from './service/judging-message.service';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';

export const MAX_QUESTION = 2;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageBoxComponent, QuestionBoxComponent, JudgingBoxComponent, TranslateModule, AppModule, FooterComponent, HeaderComponent, DialogConfirmationComponent],
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

  metadata = {
    title: "Reset your progress",
    text: "Are you sure to reset your progress ?",
    confirmMessage: "Confirm",
    cancelMessage: "Cancel"
  }

  @ViewChild(DialogConfirmationComponent) confirmationDialog !: DialogConfirmationComponent;

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

  handleResetQuestion() {
    if (this.currentQuestion > 1) {
      this.confirmationDialog.openDialog();
    }
  }

  handleResetQuestionDialogResponse(option: boolean) {
    if (option) {
      this.prefLang = "";
      this.questionList = [];
      this.currentQuestion = 1;
      this.questionService.resetQuestion();
    }
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
