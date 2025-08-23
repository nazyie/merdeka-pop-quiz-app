import { Component, EventEmitter, inject, Output } from '@angular/core';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  questionService = inject(QuestionService);

  @Output() reset = new EventEmitter<any>();

  resetQuizProgress() {
    this.reset.emit();
  }

}
