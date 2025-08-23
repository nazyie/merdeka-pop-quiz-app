import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { JudgingMessageService } from '../../service/judging-message.service';
import { Judging } from '../../model/Judging';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-judging-box',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './judging-box.component.html',
  styleUrl: './judging-box.component.scss'
})
export class JudgingBoxComponent implements OnInit{
  judgingMessageService = inject(JudgingMessageService);
  translateService = inject(TranslateService);
  questionService = inject(QuestionService);

  judging ?: Judging;
  star ?: number;
  emptyStar ?: number;
  totalStar: number = 5;

  ngOnInit(): void {
    const { correct, incorrect } = this.questionService.getOverallScore;
    const result = this.judgingMessageService.judgementResultByScore(
      {
        correct: correct,
        incorrect: incorrect
      },
      this.translateService.getDefaultLang()
    )
    this.judging = result.judgingMessage;
    this.star = result.score
    this.emptyStar = this.totalStar - this.star;
  }

}
